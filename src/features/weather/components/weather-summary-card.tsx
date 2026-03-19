import { MapPin, Sparkles } from "lucide-react";
import { FavoriteToggle } from "@/components/shared/favorite-toggle";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateTime, formatTemperature } from "@/lib/formatters";
import type { WeatherData } from "@/features/weather/types/weather.types";

type WeatherSummaryCardProps = {
  weather: WeatherData;
  isFavorited: boolean;
  onToggleFavorite: () => void;
};

export function WeatherSummaryCard({
  weather,
  isFavorited,
  onToggleFavorite,
}: WeatherSummaryCardProps) {
  return (
    <Card className="overflow-hidden border-blue-400/10 bg-[linear-gradient(135deg,rgba(12,20,36,0.98),rgba(9,15,28,0.92))]">
      <CardContent className="relative p-6 sm:p-7">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.16),transparent_26%)]" />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-cyan-200">
                  <Sparkles className="h-3.5 w-3.5" />
                  Live weather
                </div>
                <FavoriteToggle
                  isActive={isFavorited}
                  onToggle={onToggleFavorite}
                  label={isFavorited ? "Remove city from favorites" : "Save city to favorites"}
                  size="sm"
                />
              </div>
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                  {weather.city}, {weather.country}
                </h2>
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                  <MapPin className="h-4 w-4 text-cyan-300" />
                  {weather.coordinates.lat.toFixed(2)}, {weather.coordinates.lon.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-end gap-4">
              <div>
                <p className="text-6xl font-semibold tracking-tight text-white sm:text-7xl">
                  {formatTemperature(weather.temperature)}
                </p>
                <p className="mt-2 text-base capitalize text-slate-300">{weather.description}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300">
                <div className="font-medium text-slate-100">{weather.condition}</div>
                <div className="mt-1 text-slate-400">
                  Updated {formatDateTime(weather.updatedAt)}
                </div>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-center">
            <div className="flex h-32 w-32 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] shadow-glow sm:h-36 sm:w-36">
              <img
                src={weather.icon}
                alt={weather.condition}
                className="h-24 w-24 sm:h-28 sm:w-28"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
