import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPercentage } from "@/lib/formatters";

type ChangeBadgeProps = {
  change: number;
  className?: string;
};

export function ChangeBadge({ change, className }: ChangeBadgeProps) {
  const isPositive = change >= 0;
  const Icon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        isPositive
          ? "border-emerald-400/22 bg-emerald-400/12 text-emerald-200"
          : "border-rose-400/22 bg-rose-400/12 text-rose-200",
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {formatPercentage(change, { maximumFractionDigits: 2, multiplyBy100: true })}
    </span>
  );
}
