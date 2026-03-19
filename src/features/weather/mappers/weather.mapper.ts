import { WEATHER_DEFAULTS } from "@/lib/constants";
import { formatTextFallback } from "@/lib/formatters";
import type {
  ForecastItem,
  OpenWeatherCondition,
  OpenWeatherCurrentResponse,
  OpenWeatherForecastResponse,
  WeatherData,
  WeatherForecastData,
} from "@/features/weather/types/weather.types";

function getWeatherCondition(condition?: OpenWeatherCondition) {
  return {
    condition: formatTextFallback(condition?.main, "Unknown"),
    description: formatTextFallback(condition?.description, "No description available"),
    iconCode: condition?.icon ?? "01d",
  };
}

function toWeatherIconUrl(iconCode?: string) {
  const safeCode = iconCode ?? "01d";
  return `https://openweathermap.org/img/wn/${safeCode}@2x.png`;
}

function toIsoDate(timestamp?: number, fallback = new Date().toISOString()) {
  if (!timestamp) {
    return fallback;
  }

  return new Date(timestamp * 1000).toISOString();
}

function toForecastLabel(dateValue: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    hour: "numeric",
  }).format(new Date(dateValue));
}

export function mapCurrentWeather(response: OpenWeatherCurrentResponse): WeatherData {
  const primaryCondition = getWeatherCondition(response.weather?.[0]);

  return {
    city: formatTextFallback(response.name, "Unknown city"),
    country: formatTextFallback(response.sys?.country, "--"),
    temperature: response.main?.temp ?? 0,
    feelsLike: response.main?.feels_like ?? 0,
    humidity: response.main?.humidity ?? 0,
    windSpeed: response.wind?.speed ?? 0,
    pressure: response.main?.pressure ?? 0,
    visibility: response.visibility ?? 0,
    condition: primaryCondition.condition,
    icon: toWeatherIconUrl(primaryCondition.iconCode),
    description: primaryCondition.description,
    coordinates: {
      lat: response.coord?.lat ?? 0,
      lon: response.coord?.lon ?? 0,
    },
    updatedAt: toIsoDate(response.dt),
  };
}

function selectForecastEntries(response: OpenWeatherForecastResponse) {
  const entries = response.list ?? [];
  const groupedByDay = new Map<string, typeof entries[number]>();

  for (const entry of entries) {
    const sourceDate = entry.dt ? new Date(entry.dt * 1000) : entry.dt_txt ? new Date(entry.dt_txt) : null;

    if (!sourceDate || Number.isNaN(sourceDate.getTime())) {
      continue;
    }

    const dayKey = sourceDate.toISOString().slice(0, 10);
    const currentHourDistance = Math.abs(sourceDate.getHours() - 12);
    const existingEntry = groupedByDay.get(dayKey);
    const existingDate = existingEntry?.dt ? new Date(existingEntry.dt * 1000) : existingEntry?.dt_txt ? new Date(existingEntry.dt_txt) : null;
    const existingHourDistance = existingDate ? Math.abs(existingDate.getHours() - 12) : Number.POSITIVE_INFINITY;

    if (!existingEntry || currentHourDistance < existingHourDistance) {
      groupedByDay.set(dayKey, entry);
    }
  }

  return Array.from(groupedByDay.values()).slice(0, WEATHER_DEFAULTS.forecastItems);
}

export function mapForecast(response: OpenWeatherForecastResponse): WeatherForecastData {
  const forecastItems: ForecastItem[] = selectForecastEntries(response).map((entry) => {
    const primaryCondition = getWeatherCondition(entry.weather?.[0]);
    const date = entry.dt ? new Date(entry.dt * 1000).toISOString() : new Date(entry.dt_txt ?? Date.now()).toISOString();

    return {
      date,
      label: toForecastLabel(date),
      temperature: entry.main?.temp ?? 0,
      tempMin: entry.main?.temp_min ?? 0,
      tempMax: entry.main?.temp_max ?? 0,
      icon: toWeatherIconUrl(primaryCondition.iconCode),
      condition: primaryCondition.condition,
    };
  });

  return {
    city: formatTextFallback(response.city?.name, "Unknown city"),
    country: formatTextFallback(response.city?.country, "--"),
    items: forecastItems,
  };
}
