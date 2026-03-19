import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between gap-4 md:flex-row md:items-end",
        className,
      )}
    >
      <div className="space-y-3">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/90">
            {eyebrow}
          </p>
        ) : null}
        <div className="space-y-2.5">
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.6rem]">
            {title}
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            {description}
          </p>
        </div>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
