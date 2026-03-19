export type QueryParamValue =
  | string
  | number
  | boolean
  | Date
  | null
  | undefined
  | Array<string | number | boolean | Date | null | undefined>;

export type QueryParams = Record<string, QueryParamValue>;

export type HttpRequestOptions = {
  baseUrl?: string;
  query?: QueryParams;
  headers?: HeadersInit;
  signal?: AbortSignal;
};

export type HttpErrorShape = {
  name: "HttpError";
  message: string;
  status: number;
  statusText: string;
  url: string;
  details?: unknown;
};

export class HttpError extends Error implements HttpErrorShape {
  name = "HttpError" as const;

  constructor(
    public message: string,
    public status: number,
    public statusText: string,
    public url: string,
    public details?: unknown,
  ) {
    super(message);
  }
}

function appendQueryParam(searchParams: URLSearchParams, key: string, value: Exclude<QueryParamValue, QueryParamValue[]>) {
  if (value === null || value === undefined) {
    return;
  }

  const normalizedValue = value instanceof Date ? value.toISOString() : String(value);
  searchParams.append(key, normalizedValue);
}

export function serializeQueryParams(query?: QueryParams) {
  const searchParams = new URLSearchParams();

  if (!query) {
    return "";
  }

  for (const [key, rawValue] of Object.entries(query)) {
    if (Array.isArray(rawValue)) {
      rawValue.forEach((value) => appendQueryParam(searchParams, key, value));
      continue;
    }

    appendQueryParam(searchParams, key, rawValue);
  }

  return searchParams.toString();
}

export function buildUrl(path: string, options?: Pick<HttpRequestOptions, "baseUrl" | "query">) {
  const normalizedBaseUrl = options?.baseUrl?.replace(/\/$/, "") ?? "";
  const normalizedPath = path.startsWith("http")
    ? path
    : `${normalizedBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
  const queryString = serializeQueryParams(options?.query);

  return queryString ? `${normalizedPath}?${queryString}` : normalizedPath;
}

async function parseResponse(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

export async function getJson<T>(path: string, options: HttpRequestOptions = {}) {
  const url = buildUrl(path, options);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...options.headers,
    },
    signal: options.signal,
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new HttpError(
      `Request failed with status ${response.status}`,
      response.status,
      response.statusText,
      url,
      data,
    );
  }

  return data as T;
}

export function createHttpClient(defaults: Pick<HttpRequestOptions, "baseUrl" | "headers"> = {}) {
  return {
    get<T>(path: string, options: Omit<HttpRequestOptions, "baseUrl"> = {}) {
      return getJson<T>(path, {
        ...options,
        baseUrl: defaults.baseUrl,
        headers: {
          ...defaults.headers,
          ...options.headers,
        },
      });
    },
  };
}
