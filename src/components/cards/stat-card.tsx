import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: string;
  helper: string;
  icon: LucideIcon;
  trend?: string;
  className?: string;
};

export function StatCard({
  label,
  value,
  helper,
  icon: Icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden border-white/10", className)}>
      <CardContent className="relative p-6">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-500/18 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-blue-400/0 via-blue-400/35 to-cyan-300/0" />
        <div className="relative flex min-h-[220px] flex-col">
          <div className="mb-5 flex items-start justify-between gap-4">
            <p className="max-w-[72%] text-sm font-medium uppercase tracking-[0.12em] text-slate-400">
              {label}
            </p>
            <div className="shrink-0 rounded-2xl border border-blue-400/24 bg-gradient-to-br from-blue-500/22 to-cyan-400/18 p-3 text-cyan-100 shadow-glow">
              <Icon className="h-5 w-5" />
            </div>
          </div>

          <div className="min-w-0 flex-1 space-y-4">
            <p className="text-3xl font-semibold tracking-tight text-white">{value}</p>
            <p className="text-sm leading-6 text-slate-300">{helper}</p>
          </div>

          {trend ? (
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/24 bg-emerald-400/12 px-3 py-1 text-xs font-medium text-emerald-200">
              <ArrowUpRight className="h-3.5 w-3.5" />
              {trend}
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
