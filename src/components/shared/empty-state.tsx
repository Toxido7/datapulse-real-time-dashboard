import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
  action?: ReactNode;
};

export function EmptyState({
  title,
  description,
  icon: Icon = Inbox,
  action,
}: EmptyStateProps) {
  return (
    <Card className="h-full border-white/10">
      <CardContent className="flex min-h-[260px] flex-col items-center justify-center gap-5 p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-blue-400/22 bg-gradient-to-br from-blue-500/18 via-cyan-400/12 to-violet-500/14 text-cyan-200 shadow-glow">
          <Icon className="h-7 w-7" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold tracking-tight text-white">{title}</h3>
          <p className="mx-auto max-w-md text-sm leading-6 text-slate-300">{description}</p>
        </div>
        {action ? <div>{action}</div> : null}
      </CardContent>
    </Card>
  );
}
