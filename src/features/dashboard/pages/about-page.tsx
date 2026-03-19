import { Link } from "react-router-dom";
import { BarChart3, Globe2, Heart, Layers3, ServerCog, Sparkles } from "lucide-react";
import { StatCard } from "@/components/cards/stat-card";
import { PageContainer } from "@/components/layout/page-container";
import { DataSection } from "@/components/shared/data-section";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { ROUTE_PATHS } from "@/lib/constants";
import { useDocumentTitle } from "@/lib/use-document-title";

export function AboutPage() {
  useDocumentTitle("About");

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="About"
        title="DataPulse as a portfolio case study"
        description="DataPulse is a client-facing frontend product that demonstrates how real-time APIs, modular architecture, polished UX, and dashboard-style storytelling can come together in one premium React application."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Product framing"
          value="SaaS"
          helper="Designed to read like a real analytics product instead of a disconnected collection of code demos."
          icon={Sparkles}
          trend="Client-ready presentation"
        />
        <StatCard
          label="Frontend depth"
          value="Strong"
          helper="Demonstrates React, TypeScript, routing, caching, mapping, reusable UI systems, and chart integration."
          icon={Layers3}
        />
        <StatCard
          label="Integration model"
          value="Live"
          helper="Weather, countries, and markets all use real external APIs through shared service and mapper layers."
          icon={ServerCog}
        />
        <StatCard
          label="Portfolio signal"
          value="High"
          helper="Communicates architecture thinking, visual polish, async UX, and production-style organization."
          icon={Heart}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <DataSection
          title="What DataPulse is"
          description="A premium analytics dashboard portfolio project built to show both product design judgment and frontend engineering maturity."
        >
          <div className="space-y-4 text-sm leading-7 text-slate-300">
            <p>
              DataPulse combines a live weather explorer, country intelligence module, market pulse explorer, favorites system, and unified overview dashboard into one cohesive app experience.
            </p>
            <p>
              Instead of treating each module like a separate demo, the project frames them as connected product surfaces inside one scalable shell, which makes the whole application feel more believable to clients and hiring teams.
            </p>
          </div>
        </DataSection>

        <DataSection
          title="Why it works for clients"
          description="The project is intentionally positioned to showcase the kinds of decisions freelance clients care about most."
        >
          <div className="grid gap-3">
            {[
              "A polished dark SaaS interface that looks strong in screenshots and portfolio walkthroughs.",
              "Feature-based architecture that can scale cleanly as requirements grow.",
              "Real API integration with mapped app-facing data instead of raw payload rendering.",
              "Reusable loading, error, empty, search, and favorites patterns across modules.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/8 bg-slate-950/55 px-4 py-3 text-sm text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </DataSection>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <DataSection
          title="Technical skills demonstrated"
          description="The project is broad enough to showcase depth, but structured enough to remain readable."
        >
          <div className="space-y-3 text-sm text-slate-300">
            <p>React + TypeScript application architecture</p>
            <p>Feature-module organization and shared infrastructure</p>
            <p>TanStack Query for async data management</p>
            <p>API wrappers, data mappers, local persistence, and charting</p>
          </div>
        </DataSection>

        <DataSection
          title="Modules included"
          description="Each module reinforces a different product and engineering capability."
        >
          <div className="space-y-3 text-sm text-slate-300">
            <p className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-cyan-300" /> Dashboard overview</p>
            <p className="flex items-center gap-2"><Heart className="h-4 w-4 text-cyan-300" /> Favorites workspace</p>
            <p className="flex items-center gap-2"><Globe2 className="h-4 w-4 text-cyan-300" /> Country intelligence</p>
            <p className="flex items-center gap-2"><BarChart3 className="h-4 w-4 text-cyan-300" /> Market pulse</p>
          </div>
        </DataSection>

        <DataSection
          title="Explore the product"
          description="Jump directly into the strongest live modules from here."
        >
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link to={ROUTE_PATHS.dashboard}>Open dashboard</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to={ROUTE_PATHS.weather}>Weather</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to={ROUTE_PATHS.countries}>Countries</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to={ROUTE_PATHS.markets}>Markets</Link>
            </Button>
          </div>
        </DataSection>
      </div>
    </PageContainer>
  );
}
