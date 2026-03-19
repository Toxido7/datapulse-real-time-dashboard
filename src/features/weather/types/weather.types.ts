export type WeatherCoordinates = {
  lat: number;
  lon: number;
};

export type WeatherData = {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  condition: string;
  icon: string;
  description: string;
  coordinates: WeatherCoordinates;
  updatedAt: string;
};

export type ForecastItem = {
  date: string;
  label: string;
  temperature: number;
  tempMin: number;
  tempMax: number;
  icon: string;
  condition: string;
};

export type WeatherForecastData = {
  city: string;
  country: string;
  items: ForecastItem[];
};

export type OpenWeatherCondition = {
  main?: string;
  description?: string;
  icon?: string;
};

export type OpenWeatherCurrentResponse = {
  name?: string;
  dt?: number;
  coord?: {
    lon?: number;
    lat?: number;
  };
  sys?: {
    country?: string;
  };
  main?: {
    temp?: number;
    feels_like?: number;
    humidity?: number;
    pressure?: number;
  };
  wind?: {
    speed?: number;
  };
  visibility?: number;
  weather?: OpenWeatherCondition[];
};

export type OpenWeatherForecastResponse = {
  city?: {
    name?: string;
    country?: string;
  };
  list?: Array<{
    dt?: number;
    dt_txt?: string;
    main?: {
      temp?: number;
      temp_min?: number;
      temp_max?: number;
    };
    weather?: OpenWeatherCondition[];
  }>;
};

export type UseWeatherResult = {
  weather: WeatherData | null;
  forecast: WeatherForecastData | null;
  isLoading: boolean;
  isFetching: boolean;
  errorMessage: string | null;
  refetch: () => Promise<unknown>;
};
