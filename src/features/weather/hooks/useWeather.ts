import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCurrentWeatherByCity,
  fetchForecastByCity,
} from "@/features/weather/api/weather.api";
import {
  mapCurrentWeather,
  mapForecast,
} from "@/features/weather/mappers/weather.mapper";
import type { UseWeatherResult } from "@/features/weather/types/weather.types";

export function useWeather(city: string): UseWeatherResult {
  const normalizedCity = city.trim();

  const weatherQuery = useQuery({
    queryKey: ["weather", "current", normalizedCity],
    queryFn: async () => mapCurrentWeather(await fetchCurrentWeatherByCity(normalizedCity)),
    enabled: normalizedCity.length > 0,
  });

  const forecastQuery = useQuery({
    queryKey: ["weather", "forecast", normalizedCity],
    queryFn: async () => mapForecast(await fetchForecastByCity(normalizedCity)),
    enabled: normalizedCity.length > 0,
  });

  const errorMessage = useMemo(() => {
    const activeError = weatherQuery.error ?? forecastQuery.error;

    if (!activeError) {
      return null;
    }

    return activeError instanceof Error
      ? activeError.message
      : "We couldn't load weather insights right now.";
  }, [forecastQuery.error, weatherQuery.error]);

  return {
    weather: weatherQuery.data ?? null,
    forecast: forecastQuery.data ?? null,
    isLoading: weatherQuery.isLoading || forecastQuery.isLoading,
    isFetching: weatherQuery.isFetching || forecastQuery.isFetching,
    errorMessage,
    refetch: async () => {
      const results = await Promise.all([weatherQuery.refetch(), forecastQuery.refetch()]);
      return results;
    },
  };
}
