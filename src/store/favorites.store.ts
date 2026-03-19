import { useSyncExternalStore } from "react";
import { STORAGE_KEYS } from "@/lib/constants";
import type {
  AppFavorite,
  FavoriteType,
  FavoritesState,
} from "@/types/favorites.types";

const EMPTY_FAVORITES: FavoritesState = {
  weather: [],
  country: [],
  market: [],
};

const listeners = new Set<() => void>();
let favoritesState: FavoritesState = readFavorites();
let storageSyncInitialized = false;

function readFavorites(): FavoritesState {
  if (typeof window === "undefined") {
    return EMPTY_FAVORITES;
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEYS.favorites);
    if (!storedValue) {
      return EMPTY_FAVORITES;
    }

    const parsedValue = JSON.parse(storedValue) as Partial<FavoritesState>;

    return {
      weather: Array.isArray(parsedValue.weather) ? parsedValue.weather : [],
      country: Array.isArray(parsedValue.country) ? parsedValue.country : [],
      market: Array.isArray(parsedValue.market) ? parsedValue.market : [],
    };
  } catch {
    return EMPTY_FAVORITES;
  }
}

function writeFavorites(nextState: FavoritesState) {
  favoritesState = nextState;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(nextState));
  }

  listeners.forEach((listener) => listener());
}

function ensureStorageSync() {
  if (storageSyncInitialized || typeof window === "undefined") {
    return;
  }

  storageSyncInitialized = true;
  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEYS.favorites) {
      return;
    }

    favoritesState = readFavorites();
    listeners.forEach((listener) => listener());
  });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return favoritesState;
}

function getCollectionKey(type: FavoriteType) {
  return type;
}

export function addFavorite<T extends AppFavorite>(favorite: T) {
  const collectionKey = getCollectionKey(favorite.type);
  const existingItems = favoritesState[collectionKey];
  const nextItems = [favorite, ...existingItems.filter((item) => item.id !== favorite.id)] as FavoritesState[typeof collectionKey];

  writeFavorites({
    ...favoritesState,
    [collectionKey]: nextItems,
  });
}

export function removeFavorite(type: FavoriteType, id: string) {
  const collectionKey = getCollectionKey(type);

  writeFavorites({
    ...favoritesState,
    [collectionKey]: favoritesState[collectionKey].filter((item) => item.id !== id),
  });
}

export function toggleFavorite<T extends AppFavorite>(favorite: T) {
  if (isFavorited(favorite.type, favorite.id)) {
    removeFavorite(favorite.type, favorite.id);
    return;
  }

  addFavorite(favorite);
}

export function isFavorited(type: FavoriteType, id: string) {
  const collectionKey = getCollectionKey(type);
  return favoritesState[collectionKey].some((item) => item.id === id);
}

export function useFavorites() {
  ensureStorageSync();

  const favorites = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY_FAVORITES);

  return {
    favorites,
    weatherFavorites: favorites.weather,
    countryFavorites: favorites.country,
    marketFavorites: favorites.market,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorited,
  };
}
