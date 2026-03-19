type FilterChipProps = {
  label: string;
};

export function FilterChip({ label }: FilterChipProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-slate-950/75 px-3 py-1.5 text-xs font-medium text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-sm transition hover:border-cyan-400/28 hover:bg-slate-900 hover:text-white">
      {label}
    </span>
  );
}
