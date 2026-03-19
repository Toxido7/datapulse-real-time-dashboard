const defaultNumberFormatter = new Intl.NumberFormat("en-US");
const compactNumberFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export function formatNumber(value: number | null | undefined, fallback = "--") {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return fallback;
  }

  return defaultNumberFormatter.format(value);
}

export function formatCompactNumber(
  value: number | null | undefined,
  fallback = "--",
) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return fallback;
  }

  return compactNumberFormatter.format(value);
}

export function formatCurrency(
  value: number | null | undefined,
  currency = "USD",
  fallback = "--",
) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return fallback;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercentage(
  value: number | null | undefined,
  options: { maximumFractionDigits?: number; multiplyBy100?: boolean } = {},
  fallback = "--",
) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return fallback;
  }

  const normalizedValue = options.multiplyBy100 ? value / 100 : value;

  return new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: options.maximumFractionDigits ?? 1,
  }).format(normalizedValue);
}

export function formatCurrencyNumber(
  value: number | null | undefined,
  fallback = "--",
) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return fallback;
  }

  return value.toFixed(1);
}

export function formatTemperature(
  value: number | null | undefined,
  unit: "C" | "F" = "C",
  fallback = "--",
) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return fallback;
  }

  return `${Math.round(value)}\u00B0${unit}`;
}

export function formatArea(value: number | null | undefined, fallback = "--") {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return fallback;
  }

  return `${formatNumber(value)} km\u00B2`;
}

export function formatSeparatedText(
  values: Array<string | null | undefined>,
  separator = " / ",
  fallback = "--",
) {
  const parts = values
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter(Boolean);

  if (!parts.length) {
    return fallback;
  }

  return parts.join(separator);
}

export function formatDate(
  value: string | number | Date | null | undefined,
  fallback = "--",
) {
  if (!value) {
    return fallback;
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return fallback;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function formatShortDate(
  value: string | number | Date | null | undefined,
  fallback = "--",
) {
  if (!value) {
    return fallback;
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return fallback;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

export function formatTime(
  value: string | number | Date | null | undefined,
  fallback = "--",
) {
  if (!value) {
    return fallback;
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return fallback;
  }

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function formatDateTime(
  value: string | number | Date | null | undefined,
  fallback = "--",
) {
  if (!value) {
    return fallback;
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return fallback;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function formatNullable<T>(
  value: T | null | undefined,
  formatter: (input: T) => string,
  fallback = "--",
) {
  if (value === null || value === undefined) {
    return fallback;
  }

  return formatter(value);
}

export function formatTextFallback(value: string | null | undefined, fallback = "Not available") {
  if (!value || !value.trim()) {
    return fallback;
  }

  return value;
}

