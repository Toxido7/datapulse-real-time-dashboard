import { useEffect, useMemo, useState } from "react";
import { CloudSun, MapPinned } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { DataSection } from "@/components/shared/data-section";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { RefreshButton } from "@/components/shared/refresh-button";
import { SectionHeader } from "@/components/shared/section-header";
import { Skeleton } from "@/components/shared/skeleton";
import { STORAGE_KEYS } from "@/lib/constants";
import { useDocumentTitle } from "@/lib/use-document-title";
import { ForecastList } from "@/features/weather/components/forecast-list";
import { WeatherMetaGrid } from "@/features/weather/components/weather-meta-grid";
import { WeatherSearch } from "@/features/weather/components/weather-search";
import { WeatherSummaryCard } from "@/features/weather/components/weather-summary-card";
import { useWeather } from "@/features/weather/hooks/useWeather";
import type { WeatherData } from "@/features/weather/types/weather.types";
import { useFavorites } from "@/store/favorites.store";
import type { WeatherFavorite } from "@/types/favorites.types";

function readRecentCities() {
  if (typeof window === "undefined") {
    return [] as string[];
  }

  try {
    const value = window.localStorage.getItem(STORAGE_KEYS.weatherRecentCities);
    if (!value) {
      return [] as string[];
    }

    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [] as string[];
  }
}

function WeatherLoadingState() {
  return (
    <div className="space-y-5">
      <Skeleton className="h-[280px] rounded-3xl" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-[126px] rounded-3xl" />
        ))}
      </div>
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-[176px] min-w-[180px] flex-1 rounded-3xl" />
        ))}
      </div>
    </div>
  );
}

function toWeatherFavorite(city: WeatherData): WeatherFavorite {
  return {
    type: "weather",
    id: `${city.city.toLowerCase()}-${city.country.toLowerCase()}`,
    city: city.city,
    country: city.country,
    temperature: city.temperature,
    condition: city.condition,
    updatedAt: city.updatedAt,
  };
}

export function WeatherPage() {
  useDocumentTitle("Weather");

  const [searchInput, setSearchInput] = useState("");
  const [submittedCity, setSubmittedCity] = useState("");
  const [recentCities, setRecentCities] = useState<string[]>([]);
  const { weather, forecast, isLoading, isFetching, errorMessage, refetch } = useWeather(submittedCity);
  const { toggleFavorite, isFavorited } = useFavorites();

  useEffect(() => {
    setRecentCities(readRecentCities());
  }, []);

  const hasSearched = submittedCity.trim().length > 0;

  const handleSubmit = () => {
    const normalizedCity = searchInput.trim();

    if (!normalizedCity) {
      return;
    }

    setSubmittedCity(normalizedCity);
    setRecentCities((current) => {
      const next = [normalizedCity, ...current.filter((city) => city.toLowerCase() !== normalizedCity.toLowerCase())].slice(0, 5);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEYS.weatherRecentCities, JSON.stringify(next));
      }

      return next;
    });
  };

  const handleSelectRecent = (city: string) => {
    setSearchInput(city);
    setSubmittedCity(city);
  };

  const headerAction = useMemo(() => {
    if (!weather) {
      return null;
    }

    return (
      <RefreshButton
        label={isFetching ? "Refreshing..." : "Refresh live data"}
        onClick={() => {
          void refetch();
        }}
        isLoading={isFetching}
      />
    );
  }, [isFetching, refetch, weather]);

  const weatherFavorite = weather ? toWeatherFavorite(weather) : null;
  const weatherIsFavorited = weatherFavorite ? isFavorited(weatherFavorite.type, weatherFavorite.id) : false;

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Weather"
        title="Live weather intelligence"
        description="Search a city to load real current conditions and a short forecast, all rendered through the shared DataPulse infrastructure and premium UI system."
        action={headerAction}
      />

      <WeatherSearch
        value={searchInput}
        onChange={setSearchInput}
        onSubmit={handleSubmit}
        recentCities={recentCities}
        onSelectRecent={handleSelectRecent}
        isLoading={isFetching}
      />

      {!hasSearched ? (
        <EmptyState
          icon={CloudSun}
          title="Search for a city to view live weather insights"
          description="Start with any city name to load current conditions, forecast highlights, and weather metrics through the real OpenWeather API."
        />
      ) : null}

      {hasSearched && isLoading ? <WeatherLoadingState /> : null}

      {hasSearched && !isLoading && errorMessage ? (
        <ErrorState
          title="Weather data couldn't be loaded"
          message={errorMessage}
          retryLabel="Retry weather request"
          onRetry={() => {
            void refetch();
          }}
        />
      ) : null}

      {hasSearched && !isLoading && !errorMessage && weather && forecast ? (
        <div className="space-y-6">
          <WeatherSummaryCard
            weather={weather}
            isFavorited={weatherIsFavorited}
            onToggleFavorite={() => {
              if (weatherFavorite) {
                toggleFavorite(weatherFavorite);
              }
            }}
          />

          <DataSection
            title="Weather metrics"
            description="A compact operational view of the most useful current-condition details for quick scanning."
          >
            <WeatherMetaGrid weather={weather} />
          </DataSection>

          <DataSection
            title="Forecast outlook"
            description={`Short-range forecast for ${forecast.city}, ${forecast.country}.`}
            action={<div className="inline-flex items-center gap-2 text-sm text-slate-400"><MapPinned className="h-4 w-4 text-cyan-300" /> {forecast.items.length} forecast points</div>}
          >
            <ForecastList forecast={forecast} />
          </DataSection>
        </div>
      ) : null}
    </PageContainer>
  );
}
