"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/utils/helpers";

const Avatar = React.forwardRef(({ size, className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    // style={{ width: `${size}px`, height: `${size}px` }}
    className={cn(
      "rounded-full overflow-hidden flex flex-col text-lg justify-center items-center",
      "h-10 w-10",
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    fetchPriority="auto"
    className={cn(
      "object-cover rounded-full flex flex-grow",
      "h-full w-full object-cover ",
      // "hover:opacity-80",
      className
    )}
    {...props}
  ></AvatarPrimitive.Image>
));

AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        "text-color-text-main bg-color-accent rounded-full flex items-center justify-center flex-grow",
        "h-full w-full font-bold",
        // "hover:opacity-80",
        className
      )}
    >
      {children}
    </AvatarPrimitive.Fallback>
  )
);
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
