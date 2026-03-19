import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050b16] text-foreground">
      <div className="pointer-events-none fixed inset-0 bg-hero-glow opacity-80" />
      <div className="pointer-events-none fixed inset-0 opacity-20 surface-grid" />
      <div className="relative flex min-h-screen bg-[linear-gradient(180deg,rgba(5,11,22,0.98),rgba(7,13,24,0.98))]">
        <div className="hidden w-[320px] shrink-0 border-r border-white/6 bg-[linear-gradient(180deg,rgba(6,11,22,0.98),rgba(8,14,26,0.98))] p-4 lg:block">
          <div className="sticky top-4 h-[calc(100vh-2rem)] overflow-hidden">
            <Sidebar />
          </div>
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent className="lg:hidden">
            <Sidebar mobile onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        <div className="flex min-w-0 flex-1 flex-col bg-[linear-gradient(180deg,rgba(6,11,22,0.94),rgba(8,15,28,0.98))]">
          <Header onOpenMobileNav={() => setMobileOpen(true)} />
          <main className="relative flex-1 bg-[linear-gradient(180deg,rgba(6,11,22,0.96),rgba(9,17,31,0.98))] pb-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.06),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.015),transparent_16%)]" />
            <div className="relative">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

