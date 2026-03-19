import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ErrorStateProps = {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
};

export function ErrorState({
  title = "Something went off course",
  message,
  onRetry,
  retryLabel = "Try again",
}: ErrorStateProps) {
  return (
    <Card className="h-full border-rose-400/15 bg-[linear-gradient(180deg,rgba(28,14,20,0.94),rgba(19,11,17,0.9))]">
      <CardContent className="flex min-h-[240px] flex-col items-center justify-center gap-5 p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-rose-400/20 bg-rose-500/10 text-rose-300 shadow-[0_0_0_1px_rgba(251,113,133,0.08),0_0_26px_rgba(244,63,94,0.08)]">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold tracking-tight text-slate-50">{title}</h3>
          <p className="mx-auto max-w-md text-sm leading-6 text-slate-300">{message}</p>
        </div>
        {onRetry ? (
          <Button variant="outline" onClick={onRetry}>
            {retryLabel}
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}
