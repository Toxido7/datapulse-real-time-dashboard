/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEATHER_API_KEY?: string;
  readonly VITE_WEATHER_API_URL?: string;
  readonly VITE_WEATHER_CURRENT_PATH?: string;
  readonly VITE_WEATHER_FORECAST_PATH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
