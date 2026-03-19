import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { CalendarRange, LayoutPanelTop, SearchCode, Zap } from "lucide-react";
import { ChartPlaceholder } from "@/components/charts/chart-placeholder";
import { StatCard } from "@/components/cards/stat-card";
import { FilterChip } from "@/components/filters/filter-chip";
import { PageContainer } from "@/components/layout/page-container";
import { DataSection } from "@/components/shared/data-section";
import { EmptyState } from "@/components/shared/empty-state";
import { FilterBar } from "@/components/shared/filter-bar";
import { PlaceholderPanel } from "@/components/shared/placeholder-panel";
import { RefreshButton } from "@/components/shared/refresh-button";
import { SearchBar } from "@/components/shared/search-bar";
import { SectionHeader } from "@/components/shared/section-header";
import {
  DASHBOARD_LABELS,
  DEFAULT_PLACEHOLDER_METRICS,
} from "@/lib/constants";

type PageTemplateProps = {
  eyebrow: string;
  title: string;
  description: string;
  statLabel: string;
  statValue: string;
  statHelper: string;
  statIcon: LucideIcon;
  accentTags: string[];
  leftPanelTitle: string;
  leftPanelDescription: string;
  leftPanelItems: string[];
  rightPanelTitle: string;
  rightPanelDescription: string;
  rightPanelItems: string[];
  searchPlaceholder?: string;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
};

export function PageTemplate({
  eyebrow,
  title,
  description,
  statLabel,
  statValue,
  statHelper,
  statIcon,
  accentTags,
  leftPanelTitle,
  leftPanelDescription,
  leftPanelItems,
  rightPanelTitle,
  rightPanelDescription,
  rightPanelItems,
  searchPlaceholder = DASHBOARD_LABELS.searchPlaceholder,
  emptyStateTitle = DASHBOARD_LABELS.emptyTitle,
  emptyStateDescription = DASHBOARD_LABELS.emptyDescription,
}: PageTemplateProps) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <PageContainer>
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />

      <FilterBar
        actions={
          <RefreshButton label={DASHBOARD_LABELS.refreshLabel} onClick={() => undefined} />
        }
      >
        <div className="min-w-[260px] flex-1">
          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            placeholder={searchPlaceholder}
          />
        </div>
        {accentTags.map((tag) => (
          <FilterChip key={tag} label={tag} />
        ))}
      </FilterBar>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label={statLabel}
          value={statValue}
          helper={statHelper}
          icon={statIcon}
          trend="Architecture ready for phase 3"
        />
        <StatCard
          label="Planned widgets"
          value={DEFAULT_PLACEHOLDER_METRICS.plannedWidgets}
          helper="Designed placeholders for realistic composition."
          icon={LayoutPanelTop}
        />
        <StatCard
          label="Refresh strategy"
          value={DEFAULT_PLACEHOLDER_METRICS.refreshStrategy}
          helper="TanStack Query provider configured for production-style defaults."
          icon={Zap}
        />
        <StatCard
          label="Search posture"
          value={searchValue ? "Active" : "Ready"}
          helper="Shared search controls are now in place for future debounced exploration flows."
          icon={SearchCode}
        />
      </div>

      <DataSection
        title="Shared module workspace"
        description="The chart area, list panel, and empty-state surfaces now use a reusable presentation pattern that future data modules can share."
      >
        <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <ChartPlaceholder
            title="Module preview canvas"
            description="This section is reserved for future real-time charts and comparative data stories."
          />
          <PlaceholderPanel
            title={leftPanelTitle}
            description={leftPanelDescription}
            items={leftPanelItems}
          />
        </div>
      </DataSection>

      <div className="grid gap-5 lg:grid-cols-2">
        <PlaceholderPanel
          title={rightPanelTitle}
          description={rightPanelDescription}
          items={rightPanelItems}
        />
        <EmptyState
          title={emptyStateTitle}
          description={emptyStateDescription}
          action={<RefreshButton label="Retry preview" onClick={() => undefined} />}
        />
      </div>

      <DataSection
        title="Delivery notes"
        description="Phase 2 adds shared frontend infrastructure and reusable interaction patterns without locking the app into fake backend assumptions."
        action={<FilterChip label={DASHBOARD_LABELS.previewBadges[0]} />}
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {[
            "HTTP client and typed error shape ready",
            "Query client extracted with sensible defaults",
            "Search, filters, refresh, and state UIs reusable",
            "Future feature modules can plug into shared contracts",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4 text-sm leading-6 text-slate-200"
            >
              {item}
            </div>
          ))}
        </div>
      </DataSection>
    </PageContainer>
  );
}
