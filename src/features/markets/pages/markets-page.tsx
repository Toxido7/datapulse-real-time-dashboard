import { useMemo, useState } from "react";
import { Activity, ArrowDownCircle, Landmark, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/page-container";
import { DataSection } from "@/components/shared/data-section";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { FilterBar } from "@/components/shared/filter-bar";
import { RefreshButton } from "@/components/shared/refresh-button";
import { SectionHeader } from "@/components/shared/section-header";
import { Skeleton } from "@/components/shared/skeleton";
import { MARKETS_DEFAULTS } from "@/lib/constants";
import { formatCompactNumber } from "@/lib/formatters";
import { useDocumentTitle } from "@/lib/use-document-title";
import { ChangeBadge } from "@/features/markets/components/change-badge";
import { MarketSearch } from "@/features/markets/components/market-search";
import { MarketStats } from "@/features/markets/components/market-stats";
import { MarketTable } from "@/features/markets/components/market-table";
import { PriceChart } from "@/features/markets/components/price-chart";
import { useMarkets } from "@/features/markets/hooks/useMarkets";
import { useFavorites } from "@/store/favorites.store";
import type { MarketData, MarketDisplayCount, MarketSortMode } from "@/features/markets/types/markets.types";
import type { MarketFavorite } from "@/types/favorites.types";

function MarketsLoadingState() {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-[176px] rounded-3xl" />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <Skeleton className="h-[400px] rounded-3xl" />
        <Skeleton className="h-[400px] rounded-3xl" />
      </div>
      <Skeleton className="h-[640px] rounded-3xl" />
    </div>
  );
}

function toMarketFavorite(market: MarketData): MarketFavorite {
  return {
    type: "market",
    id: market.id,
    name: market.name,
    symbol: market.symbol,
    image: market.image,
    price: market.price,
    change24h: market.change24h,
    rank: market.rank,
  };
}

export function MarketsPage() {
  useDocumentTitle("Markets");

  const [searchValue, setSearchValue] = useState("");
  const [sortMode, setSortMode] = useState<MarketSortMode>("marketCap");
  const [displayCount, setDisplayCount] = useState<MarketDisplayCount>(MARKETS_DEFAULTS.defaultPerPage);
  const {
    filteredMarkets,
    chartData,
    featuredLeaders,
    isLoading,
    isFetching,
    errorMessage,
    totalCount,
    displayedCount,
    refetch,
  } = useMarkets(searchValue, sortMode, displayCount);
  const { marketFavorites, toggleFavorite } = useFavorites();

  const chartHeadline = useMemo(() => {
    if (!chartData.length) {
      return "Waiting for market data";
    }

    return `${chartData[0].symbol} leads the displayed market-cap mix`;
  }, [chartData]);

  const favoriteMarketIds = useMemo(
    () => marketFavorites.map((favorite) => favorite.id),
    [marketFavorites],
  );

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Markets"
        title="Market pulse explorer"
        description="Track top crypto assets with mapped CoinGecko market data, clean sorting controls, quick search, and a chart that surfaces market-cap leadership at a glance."
        action={
          <RefreshButton
            label={isFetching ? "Refreshing..." : "Refresh markets"}
            onClick={() => {
              void refetch();
            }}
            isLoading={isFetching}
          />
        }
      />

      <FilterBar
        actions={
          <div className="flex flex-wrap items-center gap-2">
            {MARKETS_DEFAULTS.displayCounts.map((count) => (
              <Button
                key={count}
                type="button"
                size="sm"
                variant={displayCount === count ? "default" : "outline"}
                onClick={() => setDisplayCount(count)}
              >
                Top {count}
              </Button>
            ))}
          </div>
        }
      >
        <MarketSearch value={searchValue} onChange={setSearchValue} />
        <div className="flex flex-wrap items-center gap-2">
          {MARKETS_DEFAULTS.sortOptions.map((option) => (
            <Button
              key={option.value}
              type="button"
              size="sm"
              variant={sortMode === option.value ? "default" : "outline"}
              onClick={() => setSortMode(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </FilterBar>

      {isLoading ? <MarketsLoadingState /> : null}

      {!isLoading && errorMessage ? (
        <ErrorState
          title="Market data couldn't be loaded"
          message={errorMessage}
          retryLabel="Retry markets request"
          onRetry={() => {
            void refetch();
          }}
        />
      ) : null}

      {!isLoading && !errorMessage ? (
        <>
          <MarketStats
            highestMarketCap={featuredLeaders.highestMarketCap}
            biggestGainer={featuredLeaders.biggestGainer}
            biggestLoser={featuredLeaders.biggestLoser}
            totalDisplayed={displayedCount}
          />

          {filteredMarkets.length === 0 ? (
            <EmptyState
              icon={Activity}
              title="No markets match your current search"
              description="Try a different asset name or symbol, or widen the displayed list to bring more assets into view."
              action={
                <Button
                  type="button"
                  onClick={() => {
                    setSearchValue("");
                    setSortMode("marketCap");
                    setDisplayCount(MARKETS_DEFAULTS.defaultPerPage);
                  }}
                >
                  Reset filters
                </Button>
              }
            />
          ) : (
            <>
              <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
                <DataSection
                  title="Market snapshot"
                  description="A concise chart of the highest market-cap assets in the current filtered set, colored by their 24-hour direction."
                >
                  <PriceChart data={chartData} />
                </DataSection>

                <DataSection
                  title="Signal summary"
                  description="A quick read on the current list posture so clients can scan direction, breadth, and scale before diving into the table."
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 shadow-panel">
                      <div className="flex items-center gap-3 text-slate-200">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-200">
                          <Landmark className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{chartHeadline}</p>
                          <p className="mt-1 text-sm text-slate-300">
                            {formatCompactNumber(totalCount)} assets were loaded from the live market dataset.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 shadow-panel">
                      <div className="flex items-center gap-3 text-slate-200">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-200">
                          <TrendingUp className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">Strongest momentum</p>
                          {featuredLeaders.biggestGainer ? (
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              <span className="text-sm text-slate-200">{featuredLeaders.biggestGainer.name}</span>
                              <ChangeBadge change={featuredLeaders.biggestGainer.change24h} />
                            </div>
                          ) : (
                            <p className="mt-1 text-sm text-slate-300">No positive mover detected in the current slice.</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 shadow-panel md:col-span-2">
                      <div className="flex items-center gap-3 text-slate-200">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-400/10 text-rose-200">
                          <ArrowDownCircle className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">Search and sort posture</p>
                          <p className="mt-1 text-sm text-slate-300">
                            Showing {displayedCount} of {totalCount} loaded assets, sorted by {sortMode === "change24h" ? "24h change" : sortMode === "marketCap" ? "market cap" : "price"}.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </DataSection>
              </div>

              <DataSection
                title="Top assets"
                description="A premium market table for scanning leaders, current pricing, 24-hour change, capitalization, and trading activity."
              >
                <MarketTable
                  markets={filteredMarkets}
                  favoriteIds={favoriteMarketIds}
                  onToggleFavorite={(market) => toggleFavorite(toMarketFavorite(market))}
                />
              </DataSection>
            </>
          )}
        </>
      ) : null}
    </PageContainer>
  );
}
