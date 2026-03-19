import { useMemo } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { SectionHeader } from "@/components/shared/section-header";
import { STORAGE_KEYS } from "@/lib/constants";
import { useDocumentTitle } from "@/lib/use-document-title";
import { DashboardChartSection } from "@/features/dashboard/components/dashboard-chart-section";
import { DashboardStatRow } from "@/features/dashboard/components/dashboard-stat-row";
import { CountryOverviewWidget } from "@/features/dashboard/components/country-overview-widget";
import { FavoritesOverviewWidget } from "@/features/dashboard/components/favorites-overview-widget";
import { MarketOverviewWidget } from "@/features/dashboard/components/market-overview-widget";
import { WeatherOverviewWidget } from "@/features/dashboard/components/weather-overview-widget";
import { useCountries } from "@/features/countries/hooks/useCountries";
import { useMarkets } from "@/features/markets/hooks/useMarkets";
import { useWeather } from "@/features/weather/hooks/useWeather";
import { useFavorites } from "@/store/favorites.store";

function readDashboardWeatherCity(fallbackCity?: string) {
  if (typeof window === "undefined") {
    return fallbackCity ?? "Tunis";
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEYS.weatherRecentCities);
    if (!storedValue) {
      return fallbackCity ?? "Tunis";
    }

    const parsedValue = JSON.parse(storedValue);
    if (Array.isArray(parsedValue) && typeof parsedValue[0] === "string" && parsedValue[0].trim()) {
      return parsedValue[0].trim();
    }
  } catch {
    return fallbackCity ?? "Tunis";
  }

  return fallbackCity ?? "Tunis";
}

export function DashboardPage() {
  useDocumentTitle("Dashboard");

  const { weatherFavorites, countryFavorites, marketFavorites } = useFavorites();

  const dashboardWeatherCity = useMemo(
    () => readDashboardWeatherCity(weatherFavorites[0]?.city),
    [weatherFavorites],
  );

  const weatherQuery = useWeather(dashboardWeatherCity);
  const countriesQuery = useCountries("", "All");
  const marketsQuery = useMarkets("", "marketCap", 10);

  const featuredCountry = useMemo(() => {
    const countries = countriesQuery.countries ?? [];
    if (!countries.length) {
      return null;
    }

    return [...countries].sort((left, right) => right.population - left.population)[0] ?? null;
  }, [countriesQuery.countries]);

  const favoritesChartData = useMemo(
    () => [
      { name: "Cities", value: weatherFavorites.length, color: "rgba(34,211,238,0.92)" },
      { name: "Countries", value: countryFavorites.length, color: "rgba(59,130,246,0.85)" },
      { name: "Markets", value: marketFavorites.length, color: "rgba(139,92,246,0.82)" },
    ],
    [countryFavorites.length, marketFavorites.length, weatherFavorites.length],
  );

  const totalFavorites = weatherFavorites.length + countryFavorites.length + marketFavorites.length;

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Overview"
        title="DataPulse control center"
        description="A live product overview that blends weather, countries, markets, and saved intelligence into one premium home screen without sacrificing clarity."
      />

      <DashboardStatRow
        totalFavorites={totalFavorites}
        activeModules={4}
        topMarketMover={marketsQuery.featuredLeaders.biggestGainer}
        featuredWeather={weatherQuery.weather}
        featuredCountry={featuredCountry}
      />

      <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <WeatherOverviewWidget
          weather={weatherQuery.weather}
          citySource={dashboardWeatherCity}
          isLoading={weatherQuery.isLoading}
          errorMessage={weatherQuery.errorMessage}
        />
        <FavoritesOverviewWidget
          weatherCount={weatherFavorites.length}
          countryCount={countryFavorites.length}
          marketCount={marketFavorites.length}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <CountryOverviewWidget
          country={featuredCountry}
          isLoading={countriesQuery.isLoading}
          errorMessage={countriesQuery.errorMessage}
        />
        <MarketOverviewWidget
          markets={marketsQuery.filteredMarkets}
          highestMarketCap={marketsQuery.featuredLeaders.highestMarketCap}
          biggestGainer={marketsQuery.featuredLeaders.biggestGainer}
          biggestLoser={marketsQuery.featuredLeaders.biggestLoser}
          isLoading={marketsQuery.isLoading}
          errorMessage={marketsQuery.errorMessage}
        />
      </div>

      <DashboardChartSection
        marketData={marketsQuery.chartData}
        favoritesData={favoritesChartData}
      />
    </PageContainer>
  );
}
