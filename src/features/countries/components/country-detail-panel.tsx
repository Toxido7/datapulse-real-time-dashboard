import { ExternalLink, Globe, Languages, Landmark, Map, ShieldCheck, TimerReset } from "lucide-react";
import { FavoriteToggle } from "@/components/shared/favorite-toggle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/shared/error-state";
import { Skeleton } from "@/components/shared/skeleton";
import { formatArea, formatCompactNumber, formatSeparatedText } from "@/lib/formatters";
import type { CountryDetailData } from "@/features/countries/types/countries.types";

type CountryDetailPanelProps = {
  country: CountryDetailData | null;
  isLoading?: boolean;
  errorMessage?: string | null;
  onRetry?: () => void;
  isFavorited?: boolean;
  onToggleFavorite?: () => void;
};

function joinValues(values: string[], fallback: string) {
  return values.length > 0 ? values.join(", ") : fallback;
}

function DetailValue({ value }: { value: string }) {
  return <p className="mt-3 break-words text-sm leading-6 text-slate-100">{value}</p>;
}

function DetailFlag({ country }: { country: CountryDetailData }) {
  if (country.flagSvg) {
    return (
      <div className="inline-flex h-32 max-w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 px-4 shadow-[0_18px_45px_-24px_rgba(34,211,238,0.45)] ring-1 ring-inset ring-white/5">
        <img
          src={country.flagSvg}
          alt={country.flagAlt}
          className="h-full w-auto max-w-full object-contain object-center py-3"
        />
      </div>
    );
  }

  return (
    <div className="inline-flex h-32 min-w-[11rem] max-w-full items-center justify-center rounded-2xl border border-white/10 bg-slate-950/80 px-6 text-6xl shadow-[0_18px_45px_-24px_rgba(34,211,238,0.45)] ring-1 ring-inset ring-white/5">
      {country.flag || country.cca2}
    </div>
  );
}

export function CountryDetailPanel({
  country,
  isLoading = false,
  errorMessage,
  onRetry,
  isFavorited = false,
  onToggleFavorite,
}: CountryDetailPanelProps) {
  if (isLoading) {
    return <Skeleton className="h-[640px] rounded-3xl" />;
  }

  if (errorMessage) {
    return (
      <ErrorState
        title="Country detail couldn't be loaded"
        message={errorMessage}
        retryLabel="Retry country detail"
        onRetry={onRetry}
      />
    );
  }

  if (!country) {
    return (
      <Card className="h-full">
        <CardContent className="flex min-h-[420px] items-center justify-center p-8 text-center text-slate-300">
          Select a country card to inspect a richer profile here.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full overflow-hidden border-cyan-400/14 bg-slate-900/92 shadow-[0_24px_64px_-30px_rgba(15,23,42,0.96)]">
      <CardHeader className="border-b border-white/8 pb-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <DetailFlag country={country} />
              {onToggleFavorite ? (
                <FavoriteToggle
                  isActive={isFavorited}
                  onToggle={onToggleFavorite}
                  size="sm"
                  label={isFavorited ? "Remove country from favorites" : "Save country to favorites"}
                />
              ) : null}
            </div>
            <CardTitle className="mt-4 break-words text-2xl text-white">{country.name}</CardTitle>
            <CardDescription className="mt-2 break-words text-slate-300">
              {country.officialName}
            </CardDescription>
          </div>
          <div className="shrink-0 rounded-2xl border border-white/10 bg-slate-950/80 px-3 py-2 text-right ring-1 ring-inset ring-white/5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Code</p>
            <p className="mt-1 text-sm font-semibold text-slate-100">{country.cca2} / {country.cca3}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              label: "Region",
              value: formatSeparatedText([country.region, country.subregion], " / ", "Region unavailable"),
              icon: Globe,
            },
            { label: "Capital", value: country.capital, icon: Landmark },
            { label: "Population", value: formatCompactNumber(country.population), icon: Map },
            { label: "Area", value: formatArea(country.area), icon: TimerReset },
            { label: "Languages", value: joinValues(country.languages, "No languages listed"), icon: Languages },
            { label: "Currencies", value: joinValues(country.currencies, "No currencies listed"), icon: ShieldCheck },
          ].map((item) => (
            <div
              key={item.label}
              className="min-w-0 rounded-2xl border border-white/8 bg-slate-950/65 p-4 shadow-[0_16px_36px_-28px_rgba(15,23,42,0.95)] ring-1 ring-inset ring-white/5"
            >
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
                <item.icon className="h-3.5 w-3.5 shrink-0 text-cyan-300" />
                <span>{item.label}</span>
              </div>
              <DetailValue value={item.value} />
            </div>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="min-w-0 rounded-2xl border border-white/8 bg-slate-950/65 p-4 shadow-[0_16px_36px_-28px_rgba(15,23,42,0.95)] ring-1 ring-inset ring-white/5">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Timezones</p>
            <DetailValue value={joinValues(country.timezones, "No timezone data")} />
          </div>
          <div className="min-w-0 rounded-2xl border border-white/8 bg-slate-950/65 p-4 shadow-[0_16px_36px_-28px_rgba(15,23,42,0.95)] ring-1 ring-inset ring-white/5">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Borders</p>
            <DetailValue value={joinValues(country.borders, "No bordering countries listed")} />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/8 bg-slate-950/65 p-4 shadow-[0_16px_36px_-28px_rgba(15,23,42,0.95)] ring-1 ring-inset ring-white/5">
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Independence</p>
            <p className="mt-2 break-words text-sm font-medium text-slate-100">
              {country.independent ? "Independent state" : "Dependency or special territory"}
            </p>
            <p className="mt-1 break-words text-xs uppercase tracking-[0.16em] text-slate-500">
              Status: {country.status}
            </p>
          </div>
          {country.mapsUrl ? (
            <Button asChild variant="outline" className="shrink-0">
              <a href={country.mapsUrl} target="_blank" rel="noreferrer">
                <ExternalLink className="h-4 w-4" />
                Open map
              </a>
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
