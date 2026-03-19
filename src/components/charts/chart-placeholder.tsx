import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ChartPlaceholderProps = {
  title: string;
  description: string;
};

export function ChartPlaceholder({
  title,
  description,
}: ChartPlaceholderProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-64 overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 shadow-glow">
          <div className="absolute inset-0 surface-grid opacity-25" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-blue-500/20 to-transparent" />
          <div className="absolute -top-10 right-0 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="relative flex h-full items-end gap-3">
            {[40, 56, 48, 72, 64, 82, 74, 88].map((height, index) => (
              <div
                key={index}
                className="flex-1 rounded-t-2xl border border-white/10 bg-gradient-to-t from-blue-500 via-cyan-400 to-violet-400 shadow-[0_0_20px_rgba(34,211,238,0.12)]"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
