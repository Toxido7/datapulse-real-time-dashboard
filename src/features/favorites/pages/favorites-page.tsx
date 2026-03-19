import { Link } from "react-router-dom";
import { BarChart3, Globe2, Heart, SunMedium, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/cards/stat-card";
import { PageContainer } from "@/components/layout/page-container";
import { DataSection } from "@/components/shared/data-section";
import { EmptyState } from "@/components/shared/empty-state";
import { SectionHeader } from "@/components/shared/section-header";
import { ROUTE_PATHS } from "@/lib/constants";
import { formatCompactNumber, formatDateTime, formatTemperature } from "@/lib/formatters";
import { useDocumentTitle } from "@/lib/use-document-title";
import { ChangeBadge } from "@/features/markets/components/change-badge";
import { useFavorites } from "@/store/favorites.store";
import type { CountryFavorite, MarketFavorite, WeatherFavorite } from "@/types/favorites.types";

function FavoriteSectionHeader({
  icon: Icon,
  title,
  count,
  href,
}: {
  icon: typeof SunMedium;
  title: string;
  count: number;
  href: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-200">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-lg font-semibold text-white">{title}</p>
          <p className="text-sm text-slate-300">{count} saved items</p>
        </div>
      </div>
      <Button asChild variant="outline" size="sm">
        <Link to={href}>Open module</Link>
      </Button>
    </div>
  );
}

function WeatherFavoriteCard({
  favorite,
  onRemove,
}: {
  favorite: WeatherFavorite;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 shadow-panel">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-white">{favorite.city}</p>
          <p className="mt-1 text-sm text-slate-300">{favorite.country}</p>
        </div>
        <Button variant="outline" size="icon" onClick={onRemove} aria-label={`Remove ${favorite.city} from favorites`}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-cyan-400/18 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-200">
          {formatTemperature(favorite.temperature)}
        </span>
        <span className="text-sm text-slate-300">{favorite.condition}</span>
      </div>
      <p className="mt-4 text-xs uppercase tracking-[0.16em] text-slate-500">
        Saved from live weather • {formatDateTime(favorite.updatedAt)}
      </p>
    </div>
  );
}

function CountryFavoriteCard({
  favorite,
  onRemove,
}: {
  favorite: CountryFavorite;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 shadow-panel">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80">
            {favorite.flagSvg ? (
              <img src={favorite.flagSvg} alt={`${favorite.name} flag`} className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <span className="text-xl">{favorite.flag || favorite.cca3.slice(0, 2)}</span>
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-white">{favorite.name}</p>
            <p className="mt-1 text-sm text-slate-300">{favorite.capital}</p>
          </div>
        </div>
        <Button variant="outline" size="icon" onClick={onRemove} aria-label={`Remove ${favorite.name} from favorites`}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-300">
        <span className="rounded-full border border-white/10 bg-slate-900/80 px-3 py-1">{favorite.region}</span>
        <span className="rounded-full border border-white/10 bg-slate-900/80 px-3 py-1">{favorite.cca3}</span>
      </div>
    </div>
  );
}

function MarketFavoriteCard({
  favorite,
  onRemove,
}: {
  favorite: MarketFavorite;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 shadow-panel">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80">
            {favorite.image ? (
              <img src={favorite.image} alt={`${favorite.name} logo`} className="h-8 w-8 object-contain" loading="lazy" />
            ) : (
              <span className="text-sm font-semibold text-white">{favorite.symbol.slice(0, 2)}</span>
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-white">{favorite.name}</p>
            <p className="mt-1 text-sm uppercase tracking-[0.16em] text-slate-400">{favorite.symbol}</p>
          </div>
        </div>
        <Button variant="outline" size="icon" onClick={onRemove} aria-label={`Remove ${favorite.name} from favorites`}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-white/10 bg-slate-900/80 px-3 py-1 text-sm text-slate-200">
          Rank #{favorite.rank}
        </span>
        <ChangeBadge change={favorite.change24h} />
      </div>
      <p className="mt-4 text-sm text-slate-300">Tracked price: ${formatCompactNumber(favorite.price)}</p>
    </div>
  );
}

export function FavoritesPage() {
  useDocumentTitle("Favorites");

  const { weatherFavorites, countryFavorites, marketFavorites, removeFavorite } = useFavorites();
  const totalFavorites = weatherFavorites.length + countryFavorites.length + marketFavorites.length;

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Favorites"
        title="Saved intelligence workspace"
        description="Curate cities, countries, and market assets into one polished workspace so you can revisit the most relevant live views faster."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total saved"
          value={String(totalFavorites)}
          helper="Your cross-module shortlist of saved weather locations, countries, and market assets."
          icon={Heart}
          trend="Local persistence active"
        />
        <StatCard
          label="Saved cities"
          value={String(weatherFavorites.length)}
          helper="Keep important weather locations one click away for quick revisit and refresh."
          icon={SunMedium}
        />
        <StatCard
          label="Saved countries"
          value={String(countryFavorites.length)}
          helper="Pin national profiles you want to compare again without re-running the search flow."
          icon={Globe2}
        />
        <StatCard
          label="Saved markets"
          value={String(marketFavorites.length)}
          helper="Track high-priority crypto assets and reopen the market explorer with context already chosen."
          icon={BarChart3}
        />
      </div>

      {totalFavorites === 0 ? (
        <EmptyState
          icon={Heart}
          title="No favorites saved yet"
          description="Save cities from Weather, countries from Countries, and assets from Markets to build a personal DataPulse workspace."
          action={
            <Button asChild>
              <Link to={ROUTE_PATHS.dashboard}>Explore the dashboard</Link>
            </Button>
          }
        />
      ) : (
        <div className="space-y-6">
          <DataSection
            title="Favorite cities"
            description="A quick-access weather shortlist for locations you want to revisit often."
            action={<FavoriteSectionHeader icon={SunMedium} title="Weather" count={weatherFavorites.length} href={ROUTE_PATHS.weather} />}
          >
            {weatherFavorites.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {weatherFavorites.map((favorite) => (
                  <WeatherFavoriteCard
                    key={favorite.id}
                    favorite={favorite}
                    onRemove={() => removeFavorite("weather", favorite.id)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={SunMedium}
                title="No saved cities"
                description="Use the heart action on the Weather page to save a city here."
              />
            )}
          </DataSection>

          <DataSection
            title="Favorite countries"
            description="Pinned country profiles for quick comparison and follow-up review."
            action={<FavoriteSectionHeader icon={Globe2} title="Countries" count={countryFavorites.length} href={ROUTE_PATHS.countries} />}
          >
            {countryFavorites.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {countryFavorites.map((favorite) => (
                  <CountryFavoriteCard
                    key={favorite.id}
                    favorite={favorite}
                    onRemove={() => removeFavorite("country", favorite.id)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Globe2}
                title="No saved countries"
                description="Use the heart action on country cards or inside the country detail modal to save a profile here."
              />
            )}
          </DataSection>

          <DataSection
            title="Favorite market assets"
            description="Saved crypto assets you want to keep close while scanning the live markets module."
            action={<FavoriteSectionHeader icon={BarChart3} title="Markets" count={marketFavorites.length} href={ROUTE_PATHS.markets} />}
          >
            {marketFavorites.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {marketFavorites.map((favorite) => (
                  <MarketFavoriteCard
                    key={favorite.id}
                    favorite={favorite}
                    onRemove={() => removeFavorite("market", favorite.id)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={BarChart3}
                title="No saved market assets"
                description="Use the heart action in the Markets table to track priority assets here."
              />
            )}
          </DataSection>
        </div>
      )}
    </PageContainer>
  );
}
