import { Link } from "react-router-dom";
import { CloudSun, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDateTime, formatTemperature } from "@/lib/formatters";
import type { WeatherData } from "@/features/weather/types/weather.types";

type WeatherOverviewWidgetProps = {
  weather: WeatherData | null;
  citySource: string;
  isLoading: boolean;
  errorMessage: string | null;
};

export function WeatherOverviewWidget({
  weather,
  citySource,
  isLoading,
  errorMessage,
}: WeatherOverviewWidgetProps) {
  return (
    <Card className="h-full overflow-hidden border-blue-400/10 bg-[linear-gradient(135deg,rgba(12,20,36,0.98),rgba(9,15,28,0.92))]">
      <CardContent className="relative h-full p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.16),transparent_26%)]" />
        <div className="relative flex h-full flex-col justify-between gap-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/90">Weather overview</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">Atmospheric pulse</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/18 bg-cyan-400/10 text-cyan-200 shadow-glow">
              <CloudSun className="h-5 w-5" />
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              <div className="h-10 w-40 rounded-2xl bg-white/8" />
              <div className="h-6 w-32 rounded-xl bg-white/8" />
              <div className="h-24 rounded-3xl bg-slate-950/55" />
            </div>
          ) : errorMessage ? (
            <div className="rounded-3xl border border-rose-400/16 bg-rose-400/8 p-5 text-sm leading-6 text-rose-100">
              {errorMessage}
            </div>
          ) : weather ? (
            <>
              <div className="space-y-3">
                <div>
                  <p className="text-5xl font-semibold tracking-tight text-white">{formatTemperature(weather.temperature)}</p>
                  <p className="mt-2 text-lg text-slate-200">{weather.city}, {weather.country}</p>
                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                    <MapPin className="h-4 w-4 text-cyan-300" />
                    {weather.coordinates.lat.toFixed(2)}, {weather.coordinates.lon.toFixed(2)}
                  </div>
                </div>
                <p className="text-base capitalize text-slate-300">{weather.description}</p>
              </div>

              <div className="flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-slate-950/55 p-4">
                <div>
                  <p className="text-sm font-medium text-white">Updated {formatDateTime(weather.updatedAt)}</p>
                  <p className="mt-1 text-sm text-slate-400">City source: {citySource}</p>
                </div>
                <img src={weather.icon} alt={weather.condition} className="h-16 w-16" />
              </div>
            </>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-slate-950/55 p-5 text-sm text-slate-300">
              Weather data is ready to appear as soon as a city source is available.
            </div>
          )}

          <Button asChild variant="outline" className="w-fit">
            <Link to="/weather">Open weather module</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
