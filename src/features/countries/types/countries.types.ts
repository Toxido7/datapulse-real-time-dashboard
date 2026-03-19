export type CountryRegion = "All" | "Africa" | "Americas" | "Asia" | "Europe" | "Oceania";

export type CountryListItem = {
  name: string;
  officialName: string;
  cca2: string;
  cca3: string;
  flag: string;
  flagSvg: string;
  flagAlt: string;
  capital: string;
  region: string;
  subregion: string;
  population: number;
  area: number;
  independent: boolean;
};

export type CountryDetailData = CountryListItem & {
  languages: string[];
  currencies: string[];
  timezones: string[];
  borders: string[];
  mapsUrl: string;
  status: string;
};

export type RestCountryName = {
  common?: string;
  official?: string;
};

export type RestCountryCurrency = {
  name?: string;
  symbol?: string;
};

export type RestCountryResponse = {
  name?: RestCountryName;
  cca2?: string;
  cca3?: string;
  flag?: string;
  flags?: {
    svg?: string;
    png?: string;
    alt?: string;
  };
  capital?: string[];
  region?: string;
  subregion?: string;
  population?: number;
  area?: number;
  languages?: Record<string, string>;
  currencies?: Record<string, RestCountryCurrency>;
  timezones?: string[];
  borders?: string[];
  maps?: {
    googleMaps?: string;
    openStreetMaps?: string;
  };
  independent?: boolean;
  status?: string;
};

export type UseCountriesResult = {
  countries: CountryListItem[];
  filteredCountries: CountryListItem[];
  selectedCountry: CountryListItem | null;
  selectedCountryDetails: CountryDetailData | null;
  isLoading: boolean;
  isFetching: boolean;
  isDetailLoading: boolean;
  detailErrorMessage: string | null;
  errorMessage: string | null;
  totalCount: number;
  filteredCount: number;
  setSelectedCountryCode: (code: string | null) => void;
  refetch: () => Promise<unknown>;
  refetchSelectedCountry: () => Promise<unknown>;
};
