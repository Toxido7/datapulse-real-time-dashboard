import { ArrowUpDown } from "lucide-react";
import { FavoriteToggle } from "@/components/shared/favorite-toggle";
import { ChangeBadge } from "@/features/markets/components/change-badge";
import { formatCompactNumber, formatCurrency } from "@/lib/formatters";
import type { MarketData } from "@/features/markets/types/markets.types";

type MarketTableProps = {
  markets: MarketData[];
  favoriteIds?: string[];
  onToggleFavorite?: (market: MarketData) => void;
};

function AssetCell({ market }: { market: MarketData }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 ring-1 ring-inset ring-white/5">
        {market.image ? (
          <img src={market.image} alt={`${market.name} logo`} className="h-7 w-7 object-contain" loading="lazy" />
        ) : (
          <span className="text-sm font-semibold text-slate-200">{market.symbol.slice(0, 2)}</span>
        )}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-white">{market.name}</p>
        <p className="mt-0.5 text-xs uppercase tracking-[0.16em] text-slate-400">{market.symbol}</p>
      </div>
    </div>
  );
}

export function MarketTable({
  markets,
  favoriteIds = [],
  onToggleFavorite,
}: MarketTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(7,12,24,0.92),rgba(6,10,21,0.88))] shadow-[0_24px_64px_-36px_rgba(2,8,23,0.98)]">
      <div className="hidden grid-cols-[84px_1.4fr_1fr_0.9fr_1.1fr_1.1fr_72px] items-center gap-4 border-b border-white/8 px-5 py-4 text-xs font-medium uppercase tracking-[0.18em] text-slate-400 lg:grid">
        <span>Rank</span>
        <span>Asset</span>
        <span>Price</span>
        <span>24h</span>
        <span>Market cap</span>
        <span>Volume</span>
        <span>Save</span>
      </div>

      <div className="divide-y divide-white/6">
        {markets.map((market) => {
          const isFavorited = favoriteIds.includes(market.id);

          return (
            <div key={market.id}>
              <div className="hidden grid-cols-[84px_1.4fr_1fr_0.9fr_1.1fr_1.1fr_72px] items-center gap-4 px-5 py-4 transition hover:bg-white/[0.03] lg:grid">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/8 bg-slate-950/70 px-3 py-1 text-xs font-medium text-slate-300">
                  <ArrowUpDown className="h-3.5 w-3.5 text-cyan-300" />
                  #{market.rank}
                </div>
                <AssetCell market={market} />
                <p className="text-sm font-medium text-slate-100">{formatCurrency(market.price, "USD")}</p>
                <ChangeBadge change={market.change24h} />
                <p className="text-sm font-medium text-slate-200">{formatCompactNumber(market.marketCap)}</p>
                <p className="text-sm font-medium text-slate-300">{formatCompactNumber(market.volume)}</p>
                <div className="flex justify-end">
                  {onToggleFavorite ? (
                    <FavoriteToggle
                      isActive={isFavorited}
                      onToggle={() => onToggleFavorite(market)}
                      size="sm"
                      label={isFavorited ? "Remove market from favorites" : "Save market to favorites"}
                    />
                  ) : null}
                </div>
              </div>

              <div className="space-y-4 px-4 py-4 lg:hidden">
                <div className="flex items-start justify-between gap-3">
                  <AssetCell market={market} />
                  <div className="flex shrink-0 items-center gap-2">
                    {onToggleFavorite ? (
                      <FavoriteToggle
                        isActive={isFavorited}
                        onToggle={() => onToggleFavorite(market)}
                        size="sm"
                        label={isFavorited ? "Remove market from favorites" : "Save market to favorites"}
                      />
                    ) : null}
                    <div className="inline-flex items-center rounded-full border border-white/8 bg-slate-950/70 px-3 py-1 text-xs font-medium text-slate-300">
                      #{market.rank}
                    </div>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/8 bg-slate-950/60 px-3.5 py-3">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Price</p>
                    <p className="mt-2 text-sm font-medium text-slate-100">{formatCurrency(market.price, "USD")}</p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-slate-950/60 px-3.5 py-3">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">24h change</p>
                    <div className="mt-2">
                      <ChangeBadge change={market.change24h} />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-slate-950/60 px-3.5 py-3">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Market cap</p>
                    <p className="mt-2 text-sm font-medium text-slate-100">{formatCompactNumber(market.marketCap)}</p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-slate-950/60 px-3.5 py-3">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Volume</p>
                    <p className="mt-2 text-sm font-medium text-slate-100">{formatCompactNumber(market.volume)}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
