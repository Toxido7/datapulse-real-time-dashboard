import { HttpError, createHttpClient } from "@/services/http";
import { COUNTRIES_DEFAULTS } from "@/lib/constants";
import type { RestCountryResponse } from "@/features/countries/types/countries.types";

const countriesApiClient = createHttpClient({
  baseUrl: COUNTRIES_DEFAULTS.apiUrl,
});

function mapCountriesApiError(error: unknown, fallbackMessage: string) {
  if (error instanceof Error && !(error instanceof HttpError)) {
    return error;
  }

  if (error instanceof HttpError) {
    const details = error.details as { message?: string } | string | undefined;
    const detailMessage =
      typeof details === "string"
        ? details
        : typeof details?.message === "string"
          ? details.message
          : undefined;

    return new Error(detailMessage ?? fallbackMessage);
  }

  return new Error(fallbackMessage);
}

function buildCountriesListQuery() {
  return {
    fields: COUNTRIES_DEFAULTS.listFields,
  };
}

export async function fetchAllCountries() {
  try {
    return await countriesApiClient.get<RestCountryResponse[]>(COUNTRIES_DEFAULTS.allPath, {
      query: buildCountriesListQuery(),
    });
  } catch (error) {
    throw mapCountriesApiError(
      error,
      "We couldn't load country data right now. Please try again in a moment.",
    );
  }
}

export async function fetchCountriesByName(name: string) {
  try {
    return await countriesApiClient.get<RestCountryResponse[]>(
      `${COUNTRIES_DEFAULTS.namePath}/${encodeURIComponent(name)}`,
      {
        query: buildCountriesListQuery(),
      },
    );
  } catch (error) {
    throw mapCountriesApiError(
      error,
      "We couldn't find matching countries for that search right now.",
    );
  }
}

export async function fetchCountriesByRegion(region: string) {
  try {
    return await countriesApiClient.get<RestCountryResponse[]>(
      `${COUNTRIES_DEFAULTS.regionPath}/${encodeURIComponent(region)}`,
      {
        query: buildCountriesListQuery(),
      },
    );
  } catch (error) {
    throw mapCountriesApiError(
      error,
      "We couldn't load countries for that region right now.",
    );
  }
}

export async function fetchCountryByCode(code: string) {
  try {
    return await countriesApiClient.get<RestCountryResponse | RestCountryResponse[]>(
      `${COUNTRIES_DEFAULTS.alphaPath}/${encodeURIComponent(code)}`,
    );
  } catch (error) {
    throw mapCountriesApiError(
      error,
      "We couldn't load the selected country details right now.",
    );
  }
}
