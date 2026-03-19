import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { CountryDetailPanel } from "@/features/countries/components/country-detail-panel";
import { cn } from "@/lib/utils";
import type { CountryDetailData } from "@/features/countries/types/countries.types";

type CountryDetailModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  country: CountryDetailData | null;
  isLoading?: boolean;
  errorMessage?: string | null;
  onRetry?: () => void;
  isFavorited?: boolean;
  onToggleFavorite?: () => void;
};

export function CountryDetailModal({
  open,
  onOpenChange,
  country,
  isLoading = false,
  errorMessage,
  onRetry,
  isFavorited = false,
  onToggleFavorite,
}: CountryDetailModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-50 bg-slate-950/78 backdrop-blur-md transition-opacity duration-200 data-[state=closed]:opacity-0 data-[state=open]:opacity-100"
        />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[min(960px,calc(100vw-2rem))] max-h-[88vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,14,25,0.98),rgba(12,19,34,0.96))] p-5 pt-6 shadow-[0_40px_120px_-44px_rgba(2,8,23,0.96)] backdrop-blur-2xl transition-all duration-200 data-[state=closed]:scale-95 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100",
          )}
        >
          <Dialog.Title className="sr-only">
            {country ? `${country.name} details` : "Country details"}
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            A detailed country profile displayed in a modal.
          </Dialog.Description>

          <Dialog.Close className="absolute right-5 top-5 z-10 rounded-full border border-white/10 bg-slate-950/88 p-2 text-slate-300 transition hover:border-cyan-400/30 hover:bg-slate-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Dialog.Close>

          <div className="pr-14 sm:pr-16">
            <CountryDetailPanel
              country={country}
              isLoading={isLoading}
              errorMessage={errorMessage}
              onRetry={onRetry}
              isFavorited={isFavorited}
              onToggleFavorite={onToggleFavorite}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
