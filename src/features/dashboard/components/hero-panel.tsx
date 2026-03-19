import { Activity, Layers3, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function HeroPanel() {
  return (
    <Card className="overflow-hidden border-slate-200/80 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-900 text-white">
      <CardContent className="relative grid gap-8 p-8 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.25),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(129,140,248,0.18),transparent_28%)]" />
        <div className="relative space-y-5">
          <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-white/80">
            Phase 1 Experience Layer
          </div>
          <div className="space-y-3">
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Build trust fast with a polished analytics dashboard foundation.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-300">
              DataPulse is structured for real integrations later, while already showing the product thinking, clarity, and design maturity clients expect.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="border-white/20 bg-white/10 text-white hover:bg-white/15 hover:text-white"
            >
              Explore modules
            </Button>
            <Button className="bg-white text-slate-950 hover:bg-slate-100">
              View architecture
            </Button>
          </div>
        </div>
        <div className="relative grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {[
            {
              icon: Activity,
              title: "Live-ready architecture",
              copy: "Prepared for future API fetching, caching, and domain-level hooks.",
            },
            {
              icon: Layers3,
              title: "Scalable module boundaries",
              copy: "Feature folders keep weather, countries, and markets isolated and clean.",
            },
            {
              icon: ShieldCheck,
              title: "Client-facing polish",
              copy: "Premium visual language helps the portfolio project feel immediately credible.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm"
            >
              <item.icon className="h-5 w-5 text-blue-300" />
              <p className="mt-4 text-lg font-semibold">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{item.copy}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
