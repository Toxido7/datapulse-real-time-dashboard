import { Globe2, Landmark, MapPinned, ShieldCheck, UsersRound } from "lucide-react";
import { FavoriteToggle } from "@/components/shared/favorite-toggle";
import { Card, CardContent } from "@/components/ui/card";
import { formatArea, formatCompactNumber } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { CountryListItem } from "@/features/countries/types/countries.types";

type CountryCardProps = {
  country: CountryListItem;
  isSelected?: boolean;
  isFavorited?: boolean;
  onSelect: (country: CountryListItem) => void;
  onToggleFavorite?: (country: CountryListItem) => void;
};

function FlagDisplay({ country }: { country: CountryListItem }) {
  if (country.flagSvg) {
    return (
      <div className="h-28 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 shadow-[0_18px_45px_-24px_rgba(34,211,238,0.45)] ring-1 ring-inset ring-white/5">
        <img
          src={country.flagSvg}
          alt={country.flagAlt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="flex h-28 w-full items-center justify-center rounded-2xl border border-white/10 bg-slate-950/80 text-5xl shadow-[0_18px_45px_-24px_rgba(34,211,238,0.45)] ring-1 ring-inset ring-white/5">
      {country.flag || country.cca2}
    </div>
  );
}

function MetricTile({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Globe2;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/8 bg-slate-950/65 px-3.5 py-3 shadow-[0_16px_36px_-28px_rgba(15,23,42,0.95)] ring-1 ring-inset ring-white/5">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-slate-400">
        <Icon className="h-3.5 w-3.5 shrink-0 text-cyan-300" />
        <span>{label}</span>
      </div>
      <p className="mt-2 break-words text-sm font-medium leading-5 text-slate-100">
        {value}
      </p>
    </div>
  );
}

export function CountryCard({
  country,
  isSelected = false,
  isFavorited = false,
  onSelect,
  onToggleFavorite,
}: CountryCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      className="w-full text-left"
      onClick={() => onSelect(country)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(country);
        }
      }}
    >
      <Card
        className={cn(
          "h-full overflow-hidden transition duration-200",
          isSelected
            ? "border-cyan-400/30 bg-slate-900/95 shadow-[0_24px_64px_-30px_rgba(34,211,238,0.5)]"
            : "bg-slate-900/88 hover:-translate-y-0.5 hover:border-blue-400/22 hover:shadow-[0_22px_58px_-32px_rgba(59,130,246,0.42)]",
        )}
      >
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <FlagDisplay country={country} />
              <p className="mt-4 truncate text-xl font-semibold tracking-tight text-white">
                {country.name}
              </p>
              <p className="mt-1 truncate text-sm text-slate-300">{country.capital}</p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-2">
              {onToggleFavorite ? (
                <FavoriteToggle
                  isActive={isFavorited}
                  onToggle={() => onToggleFavorite(country)}
                  stopPropagation
                  size="sm"
                  label={isFavorited ? "Remove country from favorites" : "Save country to favorites"}
                />
              ) : null}
              <span className="rounded-full border border-white/10 bg-slate-950/80 px-2.5 py-1 text-xs font-medium text-slate-300 ring-1 ring-inset ring-white/5">
                {country.cca3}
              </span>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <MetricTile icon={Globe2} label="Region" value={country.region} />
            <MetricTile
              icon={UsersRound}
              label="Pop"
              value={formatCompactNumber(country.population)}
            />
            <MetricTile icon={Landmark} label="Area" value={formatArea(country.area)} />
            <MetricTile icon={MapPinned} label="Subregion" value={country.subregion} />
          </div>

          <div className="mt-3 rounded-2xl border border-white/8 bg-slate-950/65 px-3.5 py-3 shadow-[0_16px_36px_-28px_rgba(15,23,42,0.95)] ring-1 ring-inset ring-white/5">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-cyan-300" />
              Sovereignty
            </div>
            <p className="mt-2 break-words text-sm font-medium leading-5 text-slate-100">
              {country.independent ? "Independent state" : "Dependent or special territory"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
