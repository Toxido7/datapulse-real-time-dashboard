import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAllCountries,
  fetchCountryByCode,
} from "@/features/countries/api/countries.api";
import {
  mapCountriesList,
  mapCountryDetailResponse,
} from "@/features/countries/mappers/countries.mapper";
import type {
  CountryListItem,
  CountryRegion,
  UseCountriesResult,
} from "@/features/countries/types/countries.types";

const COUNTRIES_QUERY_VERSION = "countries-list-detail-v2";

function matchesSearch(country: CountryListItem, searchTerm: string) {
  if (!searchTerm) {
    return true;
  }

  const normalizedSearch = searchTerm.toLowerCase();
  const haystack = [
    country.name,
    country.officialName,
    country.capital,
    country.region,
    country.subregion,
    country.cca2,
    country.cca3,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalizedSearch);
}

export function useCountries(searchTerm: string, region: CountryRegion): UseCountriesResult {
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null);

  const countriesQuery = useQuery({
    queryKey: ["countries", "all", COUNTRIES_QUERY_VERSION],
    queryFn: async () => mapCountriesList(await fetchAllCountries()),
  });

  const filteredCountries = useMemo(() => {
    const countries = countriesQuery.data ?? [];
    return countries.filter((country) => {
      const matchesRegion = region === "All" ? true : country.region === region;
      return matchesRegion && matchesSearch(country, searchTerm.trim());
    });
  }, [countriesQuery.data, region, searchTerm]);

  const selectedCountry = useMemo(() => {
    if (!filteredCountries.length) {
      return null;
    }

    if (selectedCountryCode) {
      return filteredCountries.find((country) => country.cca3 === selectedCountryCode) ?? filteredCountries[0];
    }

    return filteredCountries[0];
  }, [filteredCountries, selectedCountryCode]);

  const selectedCountryQuery = useQuery({
    queryKey: ["countries", "detail", selectedCountry?.cca3 ?? null, COUNTRIES_QUERY_VERSION],
    queryFn: async () => mapCountryDetailResponse(await fetchCountryByCode(selectedCountry!.cca3)),
    enabled: Boolean(selectedCountry?.cca3),
  });

  const errorMessage = useMemo(() => {
    if (!countriesQuery.error) {
      return null;
    }

    return countriesQuery.error instanceof Error
      ? countriesQuery.error.message
      : "We couldn't load countries right now.";
  }, [countriesQuery.error]);

  const detailErrorMessage = useMemo(() => {
    if (!selectedCountryQuery.error) {
      return null;
    }

    return selectedCountryQuery.error instanceof Error
      ? selectedCountryQuery.error.message
      : "We couldn't load the selected country details right now.";
  }, [selectedCountryQuery.error]);

  return {
    countries: countriesQuery.data ?? [],
    filteredCountries,
    selectedCountry,
    selectedCountryDetails: selectedCountryQuery.data ?? null,
    isLoading: countriesQuery.isLoading,
    isFetching: countriesQuery.isFetching,
    isDetailLoading: selectedCountryQuery.isLoading || selectedCountryQuery.isFetching,
    detailErrorMessage,
    errorMessage,
    totalCount: countriesQuery.data?.length ?? 0,
    filteredCount: filteredCountries.length,
    setSelectedCountryCode,
    refetch: countriesQuery.refetch,
    refetchSelectedCountry: selectedCountryQuery.refetch,
  };
}
