import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCompactNumber, formatCurrency, formatPercentage } from "@/lib/formatters";
import type { MarketChartPoint } from "@/features/markets/types/markets.types";

type PriceChartProps = {
  data: MarketChartPoint[];
};

type TooltipPayload = {
  payload: MarketChartPoint;
};

function ChartTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length) {
    return null;
  }

  const point = payload[0].payload;

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/95 px-4 py-3 shadow-panel">
      <p className="text-sm font-semibold text-white">{point.name}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">{point.symbol}</p>
      <div className="mt-3 space-y-1.5 text-sm text-slate-200">
        <p>Market cap: {formatCurrency(point.marketCap, "USD")}</p>
        <p>Price: {formatCurrency(point.price, "USD")}</p>
        <p>24h change: {formatPercentage(point.change24h, { maximumFractionDigits: 2, multiplyBy100: true })}</p>
      </div>
    </div>
  );
}

export function PriceChart({ data }: PriceChartProps) {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 8 }}>
          <defs>
            <linearGradient id="marketBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(34,211,238,0.95)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0.45)" />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="rgba(148,163,184,0.12)" />
          <XAxis
            dataKey="symbol"
            tick={{ fill: "rgba(203,213,225,0.8)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(value: number) => `$${formatCompactNumber(value)}`}
            tick={{ fill: "rgba(148,163,184,0.75)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={80}
          />
          <Tooltip cursor={{ fill: "rgba(255,255,255,0.03)" }} content={<ChartTooltip />} />
          <Bar dataKey="marketCap" radius={[12, 12, 4, 4]} fill="url(#marketBar)">
            {data.map((entry) => (
              <Cell
                key={entry.symbol}
                fill={entry.change24h >= 0 ? "rgba(34,211,238,0.9)" : "rgba(59,130,246,0.75)"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
