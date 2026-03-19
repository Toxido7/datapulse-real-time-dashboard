import { CountryCard } from "@/features/countries/components/country-card";
import type { CountryListItem } from "@/features/countries/types/countries.types";

type CountryGridProps = {
  countries: CountryListItem[];
  selectedCountryCode?: string;
  favoriteIds?: string[];
  onSelect: (country: CountryListItem) => void;
  onToggleFavorite?: (country: CountryListItem) => void;
};

export function CountryGrid({
  countries,
  selectedCountryCode,
  favoriteIds = [],
  onSelect,
  onToggleFavorite,
}: CountryGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {countries.map((country) => (
        <CountryCard
          key={country.cca3}
          country={country}
          isSelected={selectedCountryCode === country.cca3}
          isFavorited={favoriteIds.includes(country.cca3)}
          onSelect={onSelect}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
