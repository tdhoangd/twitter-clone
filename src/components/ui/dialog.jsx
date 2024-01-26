"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";

import { cn } from "@/utils/helpers";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "bg-color-backdrop/50",
        "fixed inset-0",
        "data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out",
        className
      )}
      {...props}
    />
  )
);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef(
  ({ className, scrollable, children, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.DialogContent
        ref={ref}
        className={cn(
          "z-40 no-scrollbar .no-scrollbar::-webkit-scrollbar",
          "fixed inset-0 flex items-start justify-center w-full 2sm:w-[600px] 2sm:h-fit",
          "fixed top-0 bottom-0 left-[50%] right-[50%] translate-x-[-50%]  my-0 2sm:my-[5vh]",
          "animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 data-[state=open]:2sm:slide-in-from-bottom-0 ",
          {
            "overflow-y-auto": scrollable,
          },
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "block w-full max-h-screen overflow-hidden",
            "transition-all transform shadow-xl",
            "h-full", // mobile
            "2sm:max-w-[600px] 2sm:h-fit" // not mobile
          )}
        >
          <div
            className={cn(
              "flex flex-col overflow-y-auto h-full max-h-screen 2sm:max-h-[90vh]",
              "bg-color-bg",
              "2sm:rounded-2xl"
            )}
          >
            {children}
          </div>
        </div>
      </DialogPrimitive.DialogContent>
    </DialogPortal>
  )
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogClose = DialogPrimitive.Close;

const DialogTitle = DialogPrimitive.Title;

const DialogDescription = DialogPrimitive.Description;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
