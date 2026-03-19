import { Clock3, History, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/shared/search-bar";

type WeatherSearchProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  recentCities?: string[];
  onSelectRecent?: (city: string) => void;
  isLoading?: boolean;
};

export function WeatherSearch({
  value,
  onChange,
  onSubmit,
  recentCities = [],
  onSelectRecent,
  isLoading = false,
}: WeatherSearchProps) {
  const hasRecentCities = recentCities.length > 0;

  return (
    <form
      className="rounded-3xl border border-white/8 bg-white/[0.03] p-4 backdrop-blur-sm sm:p-5"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex-1">
            <SearchBar
              value={value}
              onChange={onChange}
              placeholder="Search a city like London, Tokyo, or Tunis"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" disabled={isLoading || !value.trim()} className="min-w-[132px]">
            <Search className="h-4 w-4" />
            Search city
          </Button>
        </div>

        {hasRecentCities ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-500">
              <History className="h-3.5 w-3.5" />
              Recent searches
            </div>
            <div className="flex flex-wrap gap-2">
              {recentCities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => onSelectRecent?.(city)}
                  aria-label={`Search weather for ${city}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-slate-300 transition hover:border-cyan-400/25 hover:bg-white/[0.06] hover:text-white"
                >
                  <Clock3 className="h-3.5 w-3.5 text-cyan-300" />
                  {city}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </form>
  );
}
