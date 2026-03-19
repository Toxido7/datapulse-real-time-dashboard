import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { formatCompactNumber } from "@/lib/formatters";
import type { MarketChartPoint } from "@/features/markets/types/markets.types";

type DashboardChartSectionProps = {
  marketData: MarketChartPoint[];
  favoritesData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
};

type TooltipPayload = {
  payload: {
    name: string;
    value?: number;
    marketCap?: number;
    symbol?: string;
  };
};

function MarketTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length) {
    return null;
  }

  const point = payload[0].payload;
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/95 px-4 py-3 text-sm text-slate-200 shadow-panel">
      <p className="font-semibold text-white">{point.name}</p>
      <p className="mt-1 text-slate-400">Market cap: ${formatCompactNumber(point.marketCap ?? 0)}</p>
    </div>
  );
}

function DistributionTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length) {
    return null;
  }

  const point = payload[0].payload;
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/95 px-4 py-3 text-sm text-slate-200 shadow-panel">
      <p className="font-semibold text-white">{point.name}</p>
      <p className="mt-1 text-slate-400">Saved items: {point.value ?? 0}</p>
    </div>
  );
}

export function DashboardChartSection({
  marketData,
  favoritesData,
}: DashboardChartSectionProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <Card className="overflow-hidden border-white/10">
        <CardContent className="p-6">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/90">Market chart</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">Top assets by market cap</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">A clean view of the current market-cap hierarchy from the live CoinGecko slice used across the Markets module.</p>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marketData} margin={{ top: 8, right: 8, left: -16, bottom: 8 }}>
                <XAxis dataKey="symbol" axisLine={false} tickLine={false} tick={{ fill: "rgba(203,213,225,0.8)", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "rgba(148,163,184,0.75)", fontSize: 12 }} tickFormatter={(value: number) => `$${formatCompactNumber(value)}`} width={80} />
                <Tooltip cursor={{ fill: "rgba(255,255,255,0.03)" }} content={<MarketTooltip />} />
                <Bar dataKey="marketCap" radius={[12, 12, 4, 4]}>
                  {marketData.map((entry) => (
                    <Cell key={entry.symbol} fill={entry.change24h >= 0 ? "rgba(34,211,238,0.9)" : "rgba(59,130,246,0.72)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-white/10">
        <CardContent className="p-6">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/90">Favorites mix</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">Saved distribution</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">A quick read on how the personal workspace is weighted across weather, country, and market signals.</p>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={favoritesData} dataKey="value" nameKey="name" innerRadius={70} outerRadius={108} paddingAngle={4}>
                  {favoritesData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<DistributionTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {favoritesData.map((item) => (
              <div key={item.name} className="rounded-2xl border border-white/8 bg-slate-950/50 px-3.5 py-3">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-500">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </div>
                <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
