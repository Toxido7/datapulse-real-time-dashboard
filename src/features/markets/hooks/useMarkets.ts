import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTopMarkets } from "@/features/markets/api/markets.api";
import { mapMarketChartData, mapMarkets } from "@/features/markets/mappers/markets.mapper";
import type {
  MarketData,
  MarketDisplayCount,
  MarketSortMode,
  UseMarketsResult,
} from "@/features/markets/types/markets.types";

const MARKETS_QUERY_VERSION = "markets-top-assets-v1";

function matchesSearch(market: MarketData, searchTerm: string) {
  if (!searchTerm) {
    return true;
  }

  const normalizedSearch = searchTerm.toLowerCase();
  return `${market.name} ${market.symbol}`.toLowerCase().includes(normalizedSearch);
}

function sortMarkets(markets: MarketData[], sortMode: MarketSortMode) {
  const sortedMarkets = [...markets];

  switch (sortMode) {
    case "price":
      return sortedMarkets.sort((left, right) => right.price - left.price);
    case "change24h":
      return sortedMarkets.sort((left, right) => right.change24h - left.change24h);
    case "marketCap":
    default:
      return sortedMarkets.sort((left, right) => right.marketCap - left.marketCap);
  }
}

export function useMarkets(
  searchTerm: string,
  sortMode: MarketSortMode,
  displayCount: MarketDisplayCount,
): UseMarketsResult {
  const marketsQuery = useQuery({
    queryKey: ["markets", "top-assets", displayCount, MARKETS_QUERY_VERSION],
    queryFn: async () => mapMarkets(await fetchTopMarkets(displayCount)),
  });

  const filteredMarkets = useMemo(() => {
    const markets = marketsQuery.data ?? [];
    return sortMarkets(
      markets.filter((market) => matchesSearch(market, searchTerm.trim())),
      sortMode,
    );
  }, [marketsQuery.data, searchTerm, sortMode]);

  const featuredLeaders = useMemo(() => {
    const markets = marketsQuery.data ?? [];
    if (!markets.length) {
      return {
        highestMarketCap: null,
        biggestGainer: null,
        biggestLoser: null,
      };
    }

    return {
      highestMarketCap: [...markets].sort((left, right) => right.marketCap - left.marketCap)[0] ?? null,
      biggestGainer: [...markets].sort((left, right) => right.change24h - left.change24h)[0] ?? null,
      biggestLoser: [...markets].sort((left, right) => left.change24h - right.change24h)[0] ?? null,
    };
  }, [marketsQuery.data]);

  const errorMessage = useMemo(() => {
    if (!marketsQuery.error) {
      return null;
    }

    return marketsQuery.error instanceof Error
      ? marketsQuery.error.message
      : "We couldn't load market data right now.";
  }, [marketsQuery.error]);

  return {
    markets: marketsQuery.data ?? [],
    filteredMarkets,
    chartData: mapMarketChartData(filteredMarkets, Math.min(filteredMarkets.length, 8)),
    featuredLeaders,
    isLoading: marketsQuery.isLoading,
    isFetching: marketsQuery.isFetching,
    errorMessage,
    totalCount: marketsQuery.data?.length ?? 0,
    displayedCount: filteredMarkets.length,
    refetch: marketsQuery.refetch,
  };
}
