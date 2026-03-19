import { Card, CardContent } from "@/components/ui/card";
import { formatShortDate, formatTemperature } from "@/lib/formatters";
import type { WeatherForecastData } from "@/features/weather/types/weather.types";

type ForecastListProps = {
  forecast: WeatherForecastData;
};

export function ForecastList({ forecast }: ForecastListProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {forecast.items.map((item) => (
        <Card key={`${item.date}-${item.label}`} className="min-w-[180px] flex-1">
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-200">{item.label}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                  {formatShortDate(item.date)}
                </p>
              </div>
              <img src={item.icon} alt={item.condition} className="h-12 w-12" />
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-3xl font-semibold tracking-tight text-slate-50">
                {formatTemperature(item.temperature)}
              </p>
              <p className="text-sm text-slate-400">{item.condition}</p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Low {formatTemperature(item.tempMin)}</span>
                <span className="h-1 w-1 rounded-full bg-slate-700" />
                <span>High {formatTemperature(item.tempMax)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
