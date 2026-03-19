import { Link } from "react-router-dom";
import { ArrowUpRight, BarChart3, Coins, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChangeBadge } from "@/features/markets/components/change-badge";
import { formatCompactNumber } from "@/lib/formatters";
import type { MarketData } from "@/features/markets/types/markets.types";

type MarketOverviewWidgetProps = {
  markets: MarketData[];
  highestMarketCap: MarketData | null;
  biggestGainer: MarketData | null;
  biggestLoser: MarketData | null;
  isLoading: boolean;
  errorMessage: string | null;
};

export function MarketOverviewWidget({
  markets,
  highestMarketCap,
  biggestGainer,
  biggestLoser,
  isLoading,
  errorMessage,
}: MarketOverviewWidgetProps) {
  return (
    <Card className="h-full overflow-hidden border-white/10 bg-[linear-gradient(180deg,rgba(12,19,33,0.98),rgba(10,16,28,0.92))]">
      <CardContent className="h-full p-6">
        <div className="flex h-full flex-col justify-between gap-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/90">Market overview</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">Live asset pulse</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/18 bg-cyan-400/10 text-cyan-200 shadow-glow">
              <BarChart3 className="h-5 w-5" />
            </div>
          </div>

          {isLoading ? (
            <div className="grid gap-3 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-28 rounded-2xl bg-white/8" />
              ))}
            </div>
          ) : errorMessage ? (
            <div className="rounded-3xl border border-rose-400/16 bg-rose-400/8 p-5 text-sm leading-6 text-rose-100">
              {errorMessage}
            </div>
          ) : (
            <>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-white/8 bg-slate-950/60 p-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-500"><Coins className="h-3.5 w-3.5 text-cyan-300" /> Leader</div>
                  <p className="mt-3 text-2xl font-semibold text-white">{highestMarketCap?.symbol ?? "--"}</p>
                  <p className="mt-2 break-words text-sm text-slate-300">
                    {highestMarketCap ? `$${formatCompactNumber(highestMarketCap.marketCap)} market cap` : "Waiting for data"}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-slate-950/60 p-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-500"><TrendingUp className="h-3.5 w-3.5 text-emerald-300" /> Gainer</div>
                  <p className="mt-3 text-2xl font-semibold text-white">{biggestGainer?.symbol ?? "--"}</p>
                  <div className="mt-2">{biggestGainer ? <ChangeBadge change={biggestGainer.change24h} /> : null}</div>
                </div>
                <div className="rounded-2xl border border-white/8 bg-slate-950/60 p-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-500"><TrendingDown className="h-3.5 w-3.5 text-rose-300" /> Loser</div>
                  <p className="mt-3 text-2xl font-semibold text-white">{biggestLoser?.symbol ?? "--"}</p>
                  <div className="mt-2">{biggestLoser ? <ChangeBadge change={biggestLoser.change24h} /> : null}</div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/8 bg-slate-950/50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-white">Top assets in view</p>
                  <span className="text-xs uppercase tracking-[0.16em] text-slate-500">Market cap</span>
                </div>
                <div className="mt-4 space-y-3">
                  {markets.slice(0, 3).map((market) => (
                    <div key={market.id} className="flex items-center justify-between gap-4 rounded-2xl border border-white/6 bg-white/[0.02] px-3 py-2.5">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-100">{market.name}</p>
                        <p className="mt-0.5 text-xs uppercase tracking-[0.16em] text-slate-500">{market.symbol}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-sm text-slate-300">{formatCompactNumber(market.marketCap)}</p>
                        <ArrowUpRight className="h-4 w-4 text-cyan-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <Button asChild variant="outline" className="w-fit">
            <Link to="/markets">Open markets module</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
