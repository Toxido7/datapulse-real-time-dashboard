import { SearchBar } from "@/components/shared/search-bar";

type MarketSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function MarketSearch({ value, onChange }: MarketSearchProps) {
  return (
    <SearchBar
      value={value}
      onChange={onChange}
      placeholder="Search assets by name or symbol..."
      className="w-full lg:max-w-md"
    />
  );
}
