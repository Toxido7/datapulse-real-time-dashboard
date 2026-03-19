import { SearchBar } from "@/components/shared/search-bar";

type CountrySearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function CountrySearch({ value, onChange }: CountrySearchProps) {
  return (
    <div className="min-w-[260px] flex-1">
      <SearchBar
        value={value}
        onChange={onChange}
        placeholder="Search countries, capitals, or codes..."
      />
    </div>
  );
}
