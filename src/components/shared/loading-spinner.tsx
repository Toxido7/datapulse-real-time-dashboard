import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type LoadingSpinnerProps = {
  className?: string;
  iconClassName?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-7 w-7",
} as const;

export function LoadingSpinner({
  className,
  iconClassName,
  label,
  size = "md",
}: LoadingSpinnerProps) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-slate-300", className)}>
      <LoaderCircle className={cn("animate-spin text-cyan-300", sizeMap[size], iconClassName)} />
      {label ? <span className="text-sm text-slate-400">{label}</span> : null}
    </span>
  );
}
