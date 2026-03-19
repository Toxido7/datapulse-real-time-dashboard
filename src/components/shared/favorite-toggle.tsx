import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type FavoriteToggleProps = {
  isActive: boolean;
  onToggle: () => void;
  label?: string;
  className?: string;
  stopPropagation?: boolean;
  size?: "sm" | "md";
};

export function FavoriteToggle({
  isActive,
  onToggle,
  label,
  className,
  stopPropagation = false,
  size = "md",
}: FavoriteToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      aria-label={label ?? (isActive ? "Remove from favorites" : "Add to favorites")}
      title={label ?? (isActive ? "Remove from favorites" : "Add to favorites")}
      onClick={(event) => {
        if (stopPropagation) {
          event.stopPropagation();
        }

        onToggle();
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-full border transition duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/50",
        size === "sm" ? "h-9 w-9" : "h-10 w-10",
        isActive
          ? "border-rose-400/24 bg-rose-400/12 text-rose-200 shadow-[0_0_0_1px_rgba(251,113,133,0.12),0_0_24px_rgba(251,113,133,0.08)] hover:bg-rose-400/18"
          : "border-white/10 bg-slate-950/75 text-slate-300 hover:border-cyan-400/25 hover:bg-slate-900 hover:text-white",
        className,
      )}
    >
      <Heart className={cn("h-[18px] w-[18px]", isActive ? "fill-current" : "")} />
    </button>
  );
}

