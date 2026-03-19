import { HttpError, createHttpClient } from "@/services/http";
import { WEATHER_DEFAULTS } from "@/lib/constants";
import type {
  OpenWeatherCurrentResponse,
  OpenWeatherForecastResponse,
} from "@/features/weather/types/weather.types";

const weatherApiClient = createHttpClient({
  baseUrl: import.meta.env.VITE_WEATHER_API_URL ?? "https://api.openweathermap.org/data/2.5",
});

function getWeatherApiKey() {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Weather API key is missing. Add VITE_WEATHER_API_KEY to your .env file.",
    );
  }

  return apiKey;
}

function getCurrentWeatherPath() {
  return import.meta.env.VITE_WEATHER_CURRENT_PATH ?? WEATHER_DEFAULTS.currentPath;
}

function getForecastPath() {
  return import.meta.env.VITE_WEATHER_FORECAST_PATH ?? WEATHER_DEFAULTS.forecastPath;
}

function mapWeatherApiError(error: unknown, fallbackMessage: string) {
  if (error instanceof Error && !(error instanceof HttpError)) {
    return error;
  }

  if (error instanceof HttpError) {
    const details = error.details as { message?: string } | string | undefined;
    const detailMessage =
      typeof details === "string"
        ? details
        : typeof details?.message === "string"
          ? details.message
          : undefined;

    const message = detailMessage ?? fallbackMessage;

    return new Error(message);
  }

  return new Error(fallbackMessage);
}

export async function fetchCurrentWeatherByCity(city: string) {
  try {
    return await weatherApiClient.get<OpenWeatherCurrentResponse>(getCurrentWeatherPath(), {
      query: {
        q: city,
        appid: getWeatherApiKey(),
        units: WEATHER_DEFAULTS.units,
      },
    });
  } catch (error) {
    throw mapWeatherApiError(
      error,
      "We couldn't load current weather for that city. Please check the spelling and try again.",
    );
  }
}

export async function fetchForecastByCity(city: string) {
  try {
    return await weatherApiClient.get<OpenWeatherForecastResponse>(getForecastPath(), {
      query: {
        q: city,
        appid: getWeatherApiKey(),
        units: WEATHER_DEFAULTS.units,
      },
    });
  } catch (error) {
    throw mapWeatherApiError(
      error,
      "We couldn't load the forecast right now. Please try again in a moment.",
    );
  }
}
