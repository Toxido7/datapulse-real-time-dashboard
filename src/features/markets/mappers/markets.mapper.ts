import { formatTextFallback } from "@/lib/formatters";
import type { MarketChartPoint, MarketData, MarketsApiResponseItem } from "@/features/markets/types/markets.types";

function normalizeNumber(value: number | null | undefined, fallback = 0) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return fallback;
  }

  return value;
}

export function mapMarket(response: MarketsApiResponseItem): MarketData {
  return {
    id: formatTextFallback(response.id, "unknown-asset"),
    name: formatTextFallback(response.name, "Unknown asset"),
    symbol: formatTextFallback(response.symbol, "--").toUpperCase(),
    image: formatTextFallback(response.image, ""),
    price: normalizeNumber(response.current_price),
    change24h: normalizeNumber(response.price_change_percentage_24h),
    marketCap: normalizeNumber(response.market_cap),
    volume: normalizeNumber(response.total_volume),
    rank: normalizeNumber(response.market_cap_rank, 999),
    sparkline: response.sparkline_in_7d?.price?.filter((value) => Number.isFinite(value)) ?? [],
    circulatingSupply:
      response.circulating_supply === null || response.circulating_supply === undefined
        ? null
        : normalizeNumber(response.circulating_supply),
    ath: response.ath === null || response.ath === undefined ? null : normalizeNumber(response.ath),
    atl: response.atl === null || response.atl === undefined ? null : normalizeNumber(response.atl),
  };
}

export function mapMarkets(response: MarketsApiResponseItem[]) {
  return response.map(mapMarket).sort((left, right) => left.rank - right.rank);
}

export function mapMarketChartData(markets: MarketData[], count = 8): MarketChartPoint[] {
  return [...markets]
    .sort((left, right) => right.marketCap - left.marketCap)
    .slice(0, count)
    .map((market) => ({
      name: market.name,
      symbol: market.symbol,
      marketCap: market.marketCap,
      change24h: market.change24h,
      price: market.price,
    }));
}
