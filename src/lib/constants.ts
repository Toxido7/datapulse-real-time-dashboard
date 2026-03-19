import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Globe2,
  Heart,
  Home,
  Info,
  SunMedium,
} from "lucide-react";

export const ROUTE_PATHS = {
  root: "/",
  dashboard: "/dashboard",
  weather: "/weather",
  countries: "/countries",
  markets: "/markets",
  favorites: "/favorites",
  about: "/about",
} as const;

export type AppNavigationItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  path: (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS];
};

export const NAVIGATION_ITEMS: AppNavigationItem[] = [
  {
    title: "Dashboard",
    description: "Executive overview and module summaries",
    icon: Home,
    path: ROUTE_PATHS.dashboard,
  },
  {
    title: "Weather",
    description: "Forecast and climate data module",
    icon: SunMedium,
    path: ROUTE_PATHS.weather,
  },
  {
    title: "Countries",
    description: "Country intelligence and geo insights",
    icon: Globe2,
    path: ROUTE_PATHS.countries,
  },
  {
    title: "Markets",
    description: "Financial and market pulse module",
    icon: BarChart3,
    path: ROUTE_PATHS.markets,
  },
  {
    title: "Favorites",
    description: "Pinned views and saved items",
    icon: Heart,
    path: ROUTE_PATHS.favorites,
  },
  {
    title: "About",
    description: "Project positioning and roadmap",
    icon: Info,
    path: ROUTE_PATHS.about,
  },
];

export const STORAGE_KEYS = {
  favorites: "datapulse:favorites",
  recentSearches: "datapulse:recent-searches",
  dashboardPreferences: "datapulse:dashboard-preferences",
  weatherRecentCities: "datapulse:weather-recent-cities",
  countriesRecentSearches: "datapulse:countries-recent-searches",
  marketsRecentSearches: "datapulse:markets-recent-searches",
} as const;

export const DASHBOARD_LABELS = {
  searchPlaceholder: "Search upcoming modules, locations, or datasets...",
  refreshLabel: "Refresh preview",
  emptyTitle: "No live dataset connected yet",
  emptyDescription:
    "This section is ready for real integrations once the next feature phase plugs into the shared API and query layers.",
  previewBadges: ["Query-ready", "Reusable UI", "Module-first"],
} as const;

export const DEFAULT_PLACEHOLDER_METRICS = {
  plannedWidgets: "08",
  refreshStrategy: "Query",
  deliveryPosture: "Client",
} as const;

export const WEATHER_DEFAULTS = {
  units: "metric",
  currentPath: "/weather",
  forecastPath: "/forecast",
  maxRecentCities: 5,
  forecastItems: 5,
} as const;

export const COUNTRIES_DEFAULTS = {
  apiUrl: "https://restcountries.com/v3.1",
  allPath: "/all",
  namePath: "/name",
  regionPath: "/region",
  alphaPath: "/alpha",
  maxRecentSearches: 5,
  defaultRegion: "All",
  regions: ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"] as const,
  listFields: [
    "name",
    "cca2",
    "cca3",
    "flags",
    "capital",
    "region",
    "subregion",
    "population",
    "area",
    "independent",
  ].join(","),
} as const;

export const MARKETS_DEFAULTS = {
  apiUrl: "https://api.coingecko.com/api/v3",
  marketsPath: "/coins/markets",
  vsCurrency: "usd",
  defaultPerPage: 20,
  displayCounts: [10, 20, 50] as const,
  sortOptions: [
    { label: "Market cap", value: "marketCap" },
    { label: "Price", value: "price" },
    { label: "24h change", value: "change24h" },
  ] as const,
} as const;
