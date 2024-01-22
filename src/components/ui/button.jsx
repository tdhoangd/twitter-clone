"use client";
import { cn } from "@/utils/helpers";
import * as React from "react";
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  " flex justify-center items-center rounded-full cursor-pointer font-bold text-color-text-main",
  {
    variants: {
      variant: {
        primary: "hover:bg-color-text-main/10",
        secondary:
          "bg-color-bg-3 disabled:opacity-30 enabled:hover:brightness-75",
        accent:
          "text-white bg-color-accent disabled:opacity-30 enabled:hover:brightness-75",
        inverse:
          "enabled:cursor-pointer text-color-accent enabled:hover:bg-color-accent enabled:hover:bg-opacity-30 disabled:text-color-accent/30",
        outline:
          "bg-color-bg border border-color-border hover:bg-color-text-main/10",
        outlineRed:
          "bg-color-bg border border-color-border hover:text-color-red hover:bg-color-red/10 hover:border-color-red/60",
        primaryInverse: "text-color-bg bg-color-text-main hover:bg-opacity-90",
      },
      size: {
        default: "h-9 px-4 text-base",
        icon: "w-9 h-9 ",
        bigIcon: "w-11 h-11 !text-xl",
        sm: "h-8 px-4 text-base",
      },
    },

    defaultVariants: {
      variant: "accent",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  (
    { className, disabled, variant, size, textSize, children, ...props },
    ref
  ) => {
    return (
      <button
        disabled={disabled}
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
