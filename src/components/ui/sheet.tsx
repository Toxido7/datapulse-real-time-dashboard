import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = Dialog.Root;
const SheetTrigger = Dialog.Trigger;
const SheetClose = Dialog.Close;
const SheetPortal = Dialog.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof Dialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(({ className, ...props }, ref) => (
  <Dialog.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-slate-950/72 backdrop-blur-md", className)}
    {...props}
  />
));
SheetOverlay.displayName = Dialog.Overlay.displayName;

const SheetContent = React.forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  React.ComponentPropsWithoutRef<typeof Dialog.Content>
>(({ className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <Dialog.Content
      ref={ref}
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-[88%] max-w-sm flex-col border-r border-white/10 bg-[linear-gradient(180deg,rgba(7,12,25,0.98),rgba(13,23,40,0.96))] p-5 shadow-2xl backdrop-blur-2xl",
        className,
      )}
      {...props}
    >
      {children}
      <SheetClose className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/5 p-2 text-slate-400 transition hover:border-blue-400/30 hover:bg-white/10 hover:text-white">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetClose>
    </Dialog.Content>
  </SheetPortal>
));
SheetContent.displayName = Dialog.Content.displayName;

export { Sheet, SheetContent, SheetTrigger };
