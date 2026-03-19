import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

type RefreshButtonProps = {
  onClick?: () => void;
  isLoading?: boolean;
  label?: string;
  className?: string;
};

export function RefreshButton({
  onClick,
  isLoading = false,
  label = "Refresh",
  className,
}: RefreshButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? (
        <LoadingSpinner size="sm" iconClassName="text-cyan-300" />
      ) : (
        <RefreshCcw className="h-4 w-4" />
      )}
      {label}
    </Button>
  );
}
