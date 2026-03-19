import { Link } from "react-router-dom";
import { Building2, Globe2, Landmark, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCompactNumber } from "@/lib/formatters";
import type { CountryListItem } from "@/features/countries/types/countries.types";

type CountryOverviewWidgetProps = {
  country: CountryListItem | null;
  isLoading: boolean;
  errorMessage: string | null;
};

export function CountryOverviewWidget({
  country,
  isLoading,
  errorMessage,
}: CountryOverviewWidgetProps) {
  return (
    <Card className="h-full overflow-hidden border-white/10 bg-[linear-gradient(180deg,rgba(12,19,33,0.98),rgba(10,16,28,0.92))]">
      <CardContent className="h-full p-6">
        <div className="flex h-full flex-col justify-between gap-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/90">Country overview</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">Featured geography</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/18 bg-cyan-400/10 text-cyan-200 shadow-glow">
              <Globe2 className="h-5 w-5" />
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              <div className="h-14 w-20 rounded-2xl bg-white/8" />
              <div className="h-8 w-48 rounded-2xl bg-white/8" />
              <div className="grid gap-3 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="h-20 rounded-2xl bg-white/8" />
                ))}
              </div>
            </div>
          ) : errorMessage ? (
            <div className="rounded-3xl border border-rose-400/16 bg-rose-400/8 p-5 text-sm leading-6 text-rose-100">
              {errorMessage}
            </div>
          ) : country ? (
            <>
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70">
                  {country.flagSvg ? (
                    <img src={country.flagSvg} alt={`${country.name} flag`} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <span className="text-3xl">{country.flag || country.cca3.slice(0, 2)}</span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-2xl font-semibold text-white">{country.name}</p>
                  <p className="mt-1 text-sm text-slate-300">{country.capital}</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-slate-950/60 p-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-500"><Building2 className="h-3.5 w-3.5 text-cyan-300" /> Region</div>
                  <p className="mt-2 text-sm font-medium text-slate-100">{country.region}</p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-slate-950/60 p-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-500"><Landmark className="h-3.5 w-3.5 text-cyan-300" /> Capital</div>
                  <p className="mt-2 text-sm font-medium text-slate-100">{country.capital}</p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-slate-950/60 p-4 sm:col-span-2">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-500"><Users className="h-3.5 w-3.5 text-cyan-300" /> Population</div>
                  <p className="mt-2 text-xl font-semibold text-white">{formatCompactNumber(country.population)}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-slate-950/55 p-5 text-sm text-slate-300">
              No featured country is available yet.
            </div>
          )}

          <Button asChild variant="outline" className="w-fit">
            <Link to="/countries">Open countries module</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
