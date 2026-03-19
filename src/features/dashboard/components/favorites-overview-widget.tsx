import { Link } from "react-router-dom";
import { Globe2, Heart, MapPinned, SunMedium, WalletCards } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type FavoritesOverviewWidgetProps = {
  weatherCount: number;
  countryCount: number;
  marketCount: number;
};

export function FavoritesOverviewWidget({
  weatherCount,
  countryCount,
  marketCount,
}: FavoritesOverviewWidgetProps) {
  const total = weatherCount + countryCount + marketCount;

  return (
    <Card className="h-full overflow-hidden border-white/10 bg-[linear-gradient(180deg,rgba(12,19,33,0.98),rgba(10,16,28,0.92))]">
      <CardContent className="h-full p-6">
        <div className="flex h-full flex-col justify-between gap-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/90">Favorites overview</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">Curated workspace</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/18 bg-cyan-400/10 text-cyan-200 shadow-glow">
              <Heart className="h-5 w-5" />
            </div>
          </div>

          <div className="rounded-3xl border border-white/8 bg-slate-950/55 p-5">
            <p className="text-sm text-slate-400">Total saved items</p>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-white">{total}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: SunMedium, label: "Cities", value: weatherCount },
              { icon: Globe2, label: "Countries", value: countryCount },
              { icon: WalletCards, label: "Assets", value: marketCount },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/8 bg-slate-950/50 p-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-500">
                  <item.icon className="h-3.5 w-3.5 text-cyan-300" />
                  {item.label}
                </div>
                <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" size="sm">
              <Link to="/favorites">Open favorites</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/weather">
                <MapPinned className="h-4 w-4" />
                Revisit weather
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
