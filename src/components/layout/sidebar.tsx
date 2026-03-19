import { NavLink } from "react-router-dom";
import { appRoutes } from "@/app/router/route-config";
import { cn } from "@/lib/utils";

type SidebarProps = {
  onNavigate?: () => void;
  mobile?: boolean;
};

export function Sidebar({ onNavigate, mobile = false }: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-full min-h-0 flex-col",
        mobile
          ? "w-full bg-[linear-gradient(180deg,rgba(7,12,24,0.98),rgba(10,16,28,0.98))]"
          : "rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(9,15,28,0.98),rgba(12,20,36,0.95))] shadow-panel backdrop-blur-2xl",
      )}
    >
      <div className="shrink-0 border-b border-white/8 px-5 pb-5 pt-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-400/25 bg-gradient-to-br from-blue-500/30 via-cyan-400/18 to-violet-500/25 text-lg font-semibold text-white shadow-glow">
            DP
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight text-slate-50">DataPulse</p>
            <p className="text-sm text-slate-400">Real-Time API Dashboard</p>
          </div>
        </div>
      </div>
      <div className="hide-scrollbar flex-1 min-h-0 space-y-2 overflow-y-auto px-4 py-3">
        {appRoutes.map((route) => {
          const Icon = route.icon;
          return (
            <NavLink
              key={route.path}
              to={route.path}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  "group relative flex items-center gap-3 rounded-2xl border px-4 py-2.5 text-sm transition-all duration-200",
                  isActive
                    ? "border-blue-400/25 bg-gradient-to-r from-blue-500/18 via-cyan-400/10 to-violet-500/12 text-white shadow-glow"
                    : "border-transparent text-slate-400 hover:border-white/8 hover:bg-white/[0.04] hover:text-slate-100",
                )
              }
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/8 bg-white/[0.04] transition group-hover:border-blue-400/20 group-hover:bg-blue-400/10">
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <span className="flex-1 leading-tight">
                <span className="block font-medium">{route.title}</span>
                <span className="mt-0.5 block text-xs text-current/70">{route.description}</span>
              </span>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
}
