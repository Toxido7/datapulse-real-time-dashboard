import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type PlaceholderPanelProps = {
  title: string;
  description: string;
  items?: string[];
  footer?: ReactNode;
};

export function PlaceholderPanel({
  title,
  description,
  items = [],
  footer,
}: PlaceholderPanelProps) {
  return (
    <Card className="h-full border-white/10">
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
        <CardDescription className="text-slate-300">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/65 px-4 py-3 transition duration-200 hover:border-blue-400/24 hover:bg-slate-900/90"
          >
            <span className="text-sm font-medium text-slate-100">{item}</span>
            <span className="h-2 w-16 rounded-full bg-gradient-to-r from-blue-400/70 via-cyan-300/65 to-violet-400/55" />
          </div>
        ))}
        {footer ? <div className="pt-2">{footer}</div> : null}
      </CardContent>
    </Card>
  );
}
