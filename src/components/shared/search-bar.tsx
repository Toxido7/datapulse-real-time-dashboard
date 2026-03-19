import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
  className?: string;
  disabled?: boolean;
  showIcon?: boolean;
};

export function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  onClear,
  className,
  disabled,
  showIcon = true,
}: SearchBarProps) {
  const handleClear = () => {
    if (onClear) {
      onClear();
      return;
    }

    onChange("");
  };

  return (
    <div
      className={cn(
        "flex h-11 items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/80 px-4 text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition duration-200 focus-within:border-blue-400/40 focus-within:bg-slate-950 focus-within:shadow-glow",
        className,
      )}
    >
      {showIcon ? <Search className="h-4 w-4 text-slate-400" /> : null}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-400"
      />
      {value ? (
        <button
          type="button"
          onClick={handleClear}
          className="rounded-full p-1 text-slate-400 transition hover:bg-white/8 hover:text-white"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}
