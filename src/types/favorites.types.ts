export type FavoriteType = "weather" | "country" | "market";

export type WeatherFavorite = {
  type: "weather";
  id: string;
  city: string;
  country: string;
  temperature: number;
  condition: string;
  updatedAt: string;
};

export type CountryFavorite = {
  type: "country";
  id: string;
  name: string;
  cca3: string;
  capital: string;
  region: string;
  flag: string;
  flagSvg: string;
};

export type MarketFavorite = {
  type: "market";
  id: string;
  name: string;
  symbol: string;
  image: string;
  price: number;
  change24h: number;
  rank: number;
};

export type AppFavorite = WeatherFavorite | CountryFavorite | MarketFavorite;

export type FavoritesState = {
  weather: WeatherFavorite[];
  country: CountryFavorite[];
  market: MarketFavorite[];
};
