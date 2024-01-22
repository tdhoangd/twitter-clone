"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/helpers";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuContent = React.forwardRef(
  ({ className, sideOffset, ...props }, ref) => (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <DropdownMenuPortal>
          <DropdownMenuPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            className={cn(
              "z-[100] rounded-xl bg-color-bg ease-out duration-500 overflow-hidden shadow-xl",
              "shadow-[0px_0px_6px_2px] shadow-color-border",
              className
            )}
            {...props}
          />
        </DropdownMenuPortal>
      </motion.div>
    </AnimatePresence>
  )
);
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "group flex items-center relative font-semibold",
      "outline-none",
      "text-color-text-main hover:bg-color-text-main/10",
      "px-4 py-3",
      "text-base",
      "cursor-pointer data-[disabled]:pointer-events-none data-[highlighted]",
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item;

// Content, Item, Group, Sub, Separator

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
};
