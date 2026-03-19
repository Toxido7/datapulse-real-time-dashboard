import { ArrowBigDownDash, ArrowBigUpDash, Trophy, WalletCards } from "lucide-react";
import { StatCard } from "@/components/cards/stat-card";
import { formatCompactNumber, formatCurrency, formatPercentage } from "@/lib/formatters";
import type { MarketData } from "@/features/markets/types/markets.types";

type MarketStatsProps = {
  highestMarketCap: MarketData | null;
  biggestGainer: MarketData | null;
  biggestLoser: MarketData | null;
  totalDisplayed: number;
};

export function MarketStats({
  highestMarketCap,
  biggestGainer,
  biggestLoser,
  totalDisplayed,
}: MarketStatsProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Market cap leader"
        value={highestMarketCap?.symbol ?? "--"}
        helper={highestMarketCap
          ? `${highestMarketCap.name} holds ${formatCurrency(highestMarketCap.marketCap, "USD")} in market cap.`
          : "Waiting for market leader data."}
        icon={Trophy}
        trend={highestMarketCap ? formatCurrency(highestMarketCap.price, "USD") : undefined}
      />
      <StatCard
        label="Strongest 24h gainer"
        value={biggestGainer?.symbol ?? "--"}
        helper={biggestGainer
          ? `${biggestGainer.name} is up ${formatPercentage(biggestGainer.change24h, { maximumFractionDigits: 2, multiplyBy100: true })} in the last day.`
          : "Waiting for gainer data."}
        icon={ArrowBigUpDash}
        trend={biggestGainer ? formatCurrency(biggestGainer.price, "USD") : undefined}
      />
      <StatCard
        label="Weakest 24h mover"
        value={biggestLoser?.symbol ?? "--"}
        helper={biggestLoser
          ? `${biggestLoser.name} is down ${formatPercentage(Math.abs(biggestLoser.change24h), { maximumFractionDigits: 2, multiplyBy100: true })} in the last day.`
          : "Waiting for downside data."}
        icon={ArrowBigDownDash}
        trend={biggestLoser ? formatCurrency(biggestLoser.price, "USD") : undefined}
      />
      <StatCard
        label="Assets displayed"
        value={String(totalDisplayed)}
        helper={`The table and chart are currently focused on ${formatCompactNumber(totalDisplayed)} tracked assets.`}
        icon={WalletCards}
        trend="CoinGecko live feed"
      />
    </div>
  );
}

