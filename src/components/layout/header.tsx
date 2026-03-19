import { Bell, Menu, Search, Sparkles } from "lucide-react";
import { useLocation } from "react-router-dom";
import { appRoutes } from "@/app/router/route-config";
import { Button } from "@/components/ui/button";

type HeaderProps = {
  onOpenMobileNav: () => void;
};

export function Header({ onOpenMobileNav }: HeaderProps) {
  const location = useLocation();
  const activeRoute =
    appRoutes.find((route) => route.path === location.pathname) ?? appRoutes[0];

  return (
    <header className="sticky top-0 z-20 border-b border-white/8 bg-[linear-gradient(180deg,rgba(5,10,20,0.94),rgba(7,12,24,0.84))] shadow-[0_20px_45px_-38px_rgba(0,0,0,0.95)] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={onOpenMobileNav}
            className="lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="h-4 w-4" />
          </Button>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-cyan-300/90">
              Client-Ready Dashboard
            </p>
            <h2 className="text-xl font-semibold tracking-tight text-white">
              {activeRoute.title}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:flex">
            <Search className="h-4 w-4 text-slate-400" />
            <span className="text-sm text-slate-300">Search planned modules...</span>
          </div>
          <div className="hidden items-center gap-2 rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-blue-500/20 via-cyan-400/12 to-violet-500/18 px-4 py-2.5 text-sm font-medium text-slate-100 shadow-glow sm:flex">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            Premium foundation
          </div>
          <Button variant="outline" size="icon" aria-label="Notifications preview">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
