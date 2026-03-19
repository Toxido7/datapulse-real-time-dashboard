import {
  Compass,
  Droplets,
  Eye,
  Gauge,
  Thermometer,
  Wind,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatNumber, formatTemperature } from "@/lib/formatters";
import type { WeatherData } from "@/features/weather/types/weather.types";

type WeatherMetaItem = {
  label: string;
  icon: typeof Thermometer;
  value: (weather: WeatherData) => string;
};

const metricDefinitions: WeatherMetaItem[] = [
  {
    label: "Feels like",
    icon: Thermometer,
    value: (weather) => formatTemperature(weather.feelsLike),
  },
  {
    label: "Humidity",
    icon: Droplets,
    value: (weather) => `${formatNumber(weather.humidity)}%`,
  },
  {
    label: "Wind speed",
    icon: Wind,
    value: (weather) => `${formatNumber(weather.windSpeed)} m/s`,
  },
  {
    label: "Pressure",
    icon: Gauge,
    value: (weather) => `${formatNumber(weather.pressure)} hPa`,
  },
  {
    label: "Visibility",
    icon: Eye,
    value: (weather) => `${formatNumber(Math.round(weather.visibility / 1000))} km`,
  },
  {
    label: "Coordinates",
    icon: Compass,
    value: (weather) => `${weather.coordinates.lat.toFixed(2)}, ${weather.coordinates.lon.toFixed(2)}`,
  },
];

type WeatherMetaGridProps = {
  weather: WeatherData;
};

export function WeatherMetaGrid({ weather }: WeatherMetaGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {metricDefinitions.map((metric) => {
        const Icon = metric.icon;

        return (
          <Card key={metric.label}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">{metric.label}</p>
                  <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-50">
                    {metric.value(weather)}
                  </p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/15 bg-cyan-400/10 text-cyan-200">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
