import { Activity, Globe2, Heart, SunMedium, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/cards/stat-card";
import { formatTemperature } from "@/lib/formatters";
import type { CountryListItem } from "@/features/countries/types/countries.types";
import type { MarketData } from "@/features/markets/types/markets.types";
import type { WeatherData } from "@/features/weather/types/weather.types";

type DashboardStatRowProps = {
  totalFavorites: number;
  activeModules: number;
  topMarketMover: MarketData | null;
  featuredWeather: WeatherData | null;
  featuredCountry: CountryListItem | null;
};

export function DashboardStatRow({
  totalFavorites,
  activeModules,
  topMarketMover,
  featuredWeather,
  featuredCountry,
}: DashboardStatRowProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Saved intelligence"
        value={String(totalFavorites)}
        helper="Your curated cities, countries, and tracked assets are ready to reopen from the Favorites workspace."
        icon={Heart}
        trend="Local persistence on"
      />
      <StatCard
        label="Active modules"
        value={String(activeModules)}
        helper="Weather, Countries, Markets, and Favorites are all contributing live or persistent signals to this overview."
        icon={Activity}
      />
      <StatCard
        label="Top market mover"
        value={topMarketMover?.symbol ?? "--"}
        helper={topMarketMover ? `${topMarketMover.name} is currently leading daily momentum.` : "Waiting for market data."}
        icon={TrendingUp}
        trend={topMarketMover ? `${topMarketMover.change24h.toFixed(2)}% 24h` : undefined}
      />
      <StatCard
        label="Featured snapshot"
        value={featuredWeather ? formatTemperature(featuredWeather.temperature) : featuredCountry?.name ?? "--"}
        helper={featuredWeather ? `${featuredWeather.city} is currently reporting ${featuredWeather.condition.toLowerCase()}.` : featuredCountry ? `${featuredCountry.name} anchors the global overview dataset.` : "Waiting for overview data."}
        icon={featuredWeather ? SunMedium : Globe2}
      />
    </div>
  );
}
