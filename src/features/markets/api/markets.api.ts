import { HttpError, createHttpClient } from "@/services/http";
import { MARKETS_DEFAULTS } from "@/lib/constants";
import type { MarketsApiResponseItem } from "@/features/markets/types/markets.types";

const marketsHttpClient = createHttpClient({
  baseUrl: MARKETS_DEFAULTS.apiUrl,
});

function getMarketsErrorMessage(error: unknown) {
  if (error instanceof HttpError) {
    if (error.status === 429) {
      return "CoinGecko is rate-limiting requests right now. Please try again in a moment.";
    }

    if (error.status >= 500) {
      return "CoinGecko is having trouble responding right now. Please try again shortly.";
    }
  }

  return error instanceof Error
    ? error.message
    : "We couldn't load market data right now.";
}

export async function fetchTopMarkets(perPage: number = MARKETS_DEFAULTS.defaultPerPage) {
  try {
    return await marketsHttpClient.get<MarketsApiResponseItem[]>(MARKETS_DEFAULTS.marketsPath, {
      query: {
        vs_currency: MARKETS_DEFAULTS.vsCurrency,
        order: "market_cap_desc",
        per_page: perPage,
        page: 1,
        sparkline: true,
        price_change_percentage: "24h",
        locale: "en",
        precision: 2,
      },
    });
  } catch (error) {
    throw new Error(getMarketsErrorMessage(error));
  }
}

