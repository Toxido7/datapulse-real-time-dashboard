import type { PropsWithChildren, ReactNode } from "react";
import { cn } from "@/lib/utils";

type FilterBarProps = PropsWithChildren<{
  className?: string;
  actions?: ReactNode;
}>;

export function FilterBar({ children, className, actions }: FilterBarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(12,19,33,0.96),rgba(10,16,28,0.92))] p-4 shadow-[0_22px_50px_-34px_rgba(0,0,0,0.9)] backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">{children}</div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  );
}
