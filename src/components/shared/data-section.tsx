import type { PropsWithChildren, ReactNode } from "react";
import { cn } from "@/lib/utils";

type DataSectionProps = PropsWithChildren<{
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}>;

export function DataSection({
  title,
  description,
  action,
  className,
  children,
}: DataSectionProps) {
  return (
    <section
      className={cn(
        "rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(11,18,31,0.9),rgba(10,16,28,0.84))] p-5 shadow-[0_22px_50px_-34px_rgba(0,0,0,0.92)] backdrop-blur-xl",
        className,
      )}
    >
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1.5">
          <h2 className="text-lg font-semibold tracking-tight text-white">{title}</h2>
          {description ? <p className="text-sm text-slate-300">{description}</p> : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      {children}
    </section>
  );
}
