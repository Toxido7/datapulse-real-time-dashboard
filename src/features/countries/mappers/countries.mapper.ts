import { formatTextFallback } from "@/lib/formatters";
import type {
  CountryDetailData,
  CountryListItem,
  RestCountryCurrency,
  RestCountryResponse,
} from "@/features/countries/types/countries.types";

function mapCurrencies(currencies?: Record<string, RestCountryCurrency>) {
  if (!currencies) {
    return [] as string[];
  }

  return Object.entries(currencies).map(([code, currency]) => {
    const name = formatTextFallback(currency.name, code);
    const symbol = currency.symbol ? ` (${currency.symbol})` : "";
    return `${name}${symbol}`;
  });
}

function mapLanguages(languages?: Record<string, string>) {
  return languages ? Object.values(languages).filter(Boolean) : [];
}

function mapCapital(capital?: string[]) {
  return capital && capital.length > 0 ? capital.join(", ") : "No capital listed";
}

function mapCountryBase(response: RestCountryResponse): CountryListItem {
  return {
    name: formatTextFallback(response.name?.common, "Unknown country"),
    officialName: formatTextFallback(response.name?.official, "Official name unavailable"),
    cca2: formatTextFallback(response.cca2, "--"),
    cca3: formatTextFallback(response.cca3, "---"),
    flag: formatTextFallback(response.flag, ""),
    flagSvg: response.flags?.svg ?? response.flags?.png ?? "",
    flagAlt: formatTextFallback(response.flags?.alt, "Country flag"),
    capital: mapCapital(response.capital),
    region: formatTextFallback(response.region, "Other"),
    subregion: formatTextFallback(response.subregion, "Subregion unavailable"),
    population: response.population ?? 0,
    area: response.area ?? 0,
    independent: response.independent ?? false,
  };
}

export function mapCountryListItem(response: RestCountryResponse): CountryListItem {
  return mapCountryBase(response);
}

export function mapCountryDetail(response: RestCountryResponse): CountryDetailData {
  const base = mapCountryBase(response);

  return {
    ...base,
    languages: mapLanguages(response.languages),
    currencies: mapCurrencies(response.currencies),
    timezones: response.timezones ?? [],
    borders: response.borders ?? [],
    mapsUrl: response.maps?.googleMaps ?? response.maps?.openStreetMaps ?? "",
    status: formatTextFallback(response.status, "Unknown"),
  };
}

export function mapCountriesList(response: RestCountryResponse[]) {
  return response
    .map(mapCountryListItem)
    .sort((left, right) => left.name.localeCompare(right.name));
}

export function mapCountryDetailResponse(response: RestCountryResponse | RestCountryResponse[]) {
  const payload = Array.isArray(response) ? response[0] : response;
  return mapCountryDetail(payload);
}
