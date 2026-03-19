import type { ReactNode } from "react";

export type MarketSortMode = "marketCap" | "price" | "change24h";
export type MarketDisplayCount = 10 | 20 | 50;

export type MarketData = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume: number;
  rank: number;
  sparkline: number[];
  circulatingSupply: number | null;
  ath: number | null;
  atl: number | null;
};

export type MarketStatItem = {
  label: string;
  value: string;
  helper: string;
  icon: ReactNode;
  trend?: string;
};

export type MarketChartPoint = {
  name: string;
  symbol: string;
  marketCap: number;
  change24h: number;
  price: number;
};

export type MarketsApiResponseItem = {
  id?: string;
  name?: string;
  symbol?: string;
  image?: string;
  current_price?: number;
  market_cap?: number;
  total_volume?: number;
  price_change_percentage_24h?: number;
  market_cap_rank?: number;
  sparkline_in_7d?: {
    price?: number[];
  };
  circulating_supply?: number;
  ath?: number;
  atl?: number;
};

export type UseMarketsResult = {
  markets: MarketData[];
  filteredMarkets: MarketData[];
  chartData: MarketChartPoint[];
  featuredLeaders: {
    highestMarketCap: MarketData | null;
    biggestGainer: MarketData | null;
    biggestLoser: MarketData | null;
  };
  isLoading: boolean;
  isFetching: boolean;
  errorMessage: string | null;
  totalCount: number;
  displayedCount: number;
  refetch: () => Promise<unknown>;
};
