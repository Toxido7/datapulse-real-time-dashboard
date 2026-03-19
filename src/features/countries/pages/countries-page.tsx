import { useEffect, useMemo, useState } from "react";
import { Globe2, Layers3, ScanSearch, Waypoints } from "lucide-react";
import { StatCard } from "@/components/cards/stat-card";
import { PageContainer } from "@/components/layout/page-container";
import { DataSection } from "@/components/shared/data-section";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { FilterBar } from "@/components/shared/filter-bar";
import { RefreshButton } from "@/components/shared/refresh-button";
import { SectionHeader } from "@/components/shared/section-header";
import { Skeleton } from "@/components/shared/skeleton";
import { COUNTRIES_DEFAULTS } from "@/lib/constants";
import { useDocumentTitle } from "@/lib/use-document-title";
import { CountryDetailModal } from "@/features/countries/components/country-detail-modal";
import { CountryGrid } from "@/features/countries/components/country-grid";
import { CountrySearch } from "@/features/countries/components/country-search";
import { RegionFilter } from "@/features/countries/components/region-filter";
import { useCountries } from "@/features/countries/hooks/useCountries";
import { useFavorites } from "@/store/favorites.store";
import type { CountryListItem, CountryRegion } from "@/features/countries/types/countries.types";
import type { CountryFavorite } from "@/types/favorites.types";

function CountriesLoadingState() {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-[176px] rounded-3xl" />
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-[312px] rounded-3xl" />
        ))}
      </div>
    </div>
  );
}

function toCountryFavorite(country: CountryListItem): CountryFavorite {
  return {
    type: "country",
    id: country.cca3,
    name: country.name,
    cca3: country.cca3,
    capital: country.capital,
    region: country.region,
    flag: country.flag,
    flagSvg: country.flagSvg,
  };
}

export function CountriesPage() {
  useDocumentTitle("Countries");

  const [searchValue, setSearchValue] = useState("");
  const [region, setRegion] = useState<CountryRegion>(COUNTRIES_DEFAULTS.defaultRegion);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const {
    filteredCountries,
    selectedCountry,
    selectedCountryDetails,
    isLoading,
    isFetching,
    isDetailLoading,
    errorMessage,
    detailErrorMessage,
    totalCount,
    filteredCount,
    setSelectedCountryCode,
    refetch,
    refetchSelectedCountry,
  } = useCountries(searchValue, region);
  const { countryFavorites, toggleFavorite, isFavorited } = useFavorites();

  const featuredCountry = selectedCountry ?? filteredCountries[0] ?? null;

  useEffect(() => {
    if (!filteredCountries.length) {
      setIsDetailModalOpen(false);
    }
  }, [filteredCountries.length]);

  const handleSelectCountry = (country: CountryListItem) => {
    setSelectedCountryCode(country.cca3);
    setIsDetailModalOpen(true);
  };

  const regionLabel = useMemo(() => {
    return region === "All" ? "Global dataset" : `${region} focus`;
  }, [region]);

  const favoriteCountryIds = useMemo(
    () => countryFavorites.map((favorite) => favorite.id),
    [countryFavorites],
  );

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Countries"
        title="Country intelligence explorer"
        description="Browse a polished global dataset with instant search, region filters, concise country cards, and a richer modal profile for deeper context."
        action={
          <RefreshButton
            label={isFetching ? "Refreshing..." : "Refresh countries"}
            onClick={() => {
              void refetch();
            }}
            isLoading={isFetching}
          />
        }
      />

      <FilterBar>
        <CountrySearch value={searchValue} onChange={setSearchValue} />
        <RegionFilter value={region} onChange={setRegion} />
      </FilterBar>

      {isLoading ? <CountriesLoadingState /> : null}

      {!isLoading && errorMessage ? (
        <ErrorState
          title="Country data couldn't be loaded"
          message={errorMessage}
          retryLabel="Retry countries request"
          onRetry={() => {
            void refetch();
          }}
        />
      ) : null}

      {!isLoading && !errorMessage ? (
        <>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Dataset coverage"
              value={String(totalCount)}
              helper="Lightweight list records loaded with a REST Countries fields query capped to the current API limit."
              icon={Globe2}
              trend="List endpoint ready"
            />
            <StatCard
              label="Currently shown"
              value={String(filteredCount)}
              helper="The result count updates instantly as search and region filters change."
              icon={ScanSearch}
            />
            <StatCard
              label="Filter context"
              value={regionLabel}
              helper="Move across regions without losing the premium browsing flow."
              icon={Layers3}
            />
            <StatCard
              label="Selected profile"
              value={featuredCountry?.cca3 ?? "None"}
              helper="Click any card to open a richer country profile in a dedicated modal view."
              icon={Waypoints}
            />
          </div>

          {filteredCountries.length === 0 ? (
            <EmptyState
              icon={Globe2}
              title="No countries match your current filters"
              description="Try a different search term or switch back to another region to widen the results."
              action={
                <RefreshButton
                  label="Reset dataset"
                  onClick={() => {
                    setSearchValue("");
                    setRegion(COUNTRIES_DEFAULTS.defaultRegion);
                  }}
                />
              }
            />
          ) : (
            <DataSection
              title="Country grid"
              description="A scan-friendly explorer designed to compare national profiles quickly, with richer country detail now opening in a focused modal."
            >
              <CountryGrid
                countries={filteredCountries}
                selectedCountryCode={isDetailModalOpen ? featuredCountry?.cca3 : undefined}
                favoriteIds={favoriteCountryIds}
                onSelect={handleSelectCountry}
                onToggleFavorite={(country) => toggleFavorite(toCountryFavorite(country))}
              />
            </DataSection>
          )}

          <CountryDetailModal
            open={isDetailModalOpen}
            onOpenChange={setIsDetailModalOpen}
            country={selectedCountryDetails}
            isLoading={isDetailLoading}
            errorMessage={detailErrorMessage}
            isFavorited={selectedCountryDetails ? isFavorited("country", selectedCountryDetails.cca3) : false}
            onToggleFavorite={
              selectedCountryDetails
                ? () => {
                    toggleFavorite(toCountryFavorite(selectedCountryDetails));
                  }
                : undefined
            }
            onRetry={() => {
              void refetchSelectedCountry();
            }}
          />
        </>
      ) : null}
    </PageContainer>
  );
}
