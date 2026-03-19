import { COUNTRIES_DEFAULTS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { CountryRegion } from "@/features/countries/types/countries.types";

type RegionFilterProps = {
  value: CountryRegion;
  onChange: (value: CountryRegion) => void;
};

export function RegionFilter({ value, onChange }: RegionFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {COUNTRIES_DEFAULTS.regions.map((region) => (
        <button
          key={region}
          type="button"
          onClick={() => onChange(region)}
          className={cn(
            "rounded-full border px-3.5 py-2 text-sm font-medium transition",
            value === region
              ? "border-cyan-400/30 bg-gradient-to-r from-blue-500/18 to-cyan-400/14 text-white shadow-glow"
              : "border-white/10 bg-slate-950/70 text-slate-300 hover:border-white/14 hover:bg-slate-900 hover:text-white",
          )}
        >
          {region}
        </button>
      ))}
    </div>
  );
}
