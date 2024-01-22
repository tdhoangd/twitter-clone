"use client";

import HintTooltip from "@/components/ui/hint-tooltip";
import { cn, stopBubbling } from "@/utils/helpers";
import { cva } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const hoverBgVariants = cva("", {
  variants: {
    color: {
      blue: "group-hover:bg-color-blue/20",
      red: "group-hover:bg-color-red/20",
      green: "group-hover:bg-color-green/20",
    },
  },
  defaultVariants: {
    color: "blue",
  },
});

const hoverTextVariants = cva("", {
  variants: {
    color: {
      blue: "group-hover:text-color-blue",
      red: "group-hover:text-color-red",
      green: "group-hover:text-color-green",
    },
  },
  defaultVariants: {
    color: "blue",
  },
});

const activeTextVariants = cva("", {
  variants: {
    color: {
      default: "text-color-text-secondary",
      blue: "text-color-blue",
      red: "text-color-red",
      green: "text-color-green",
    },
  },
  defaultVariants: {
    color: "default",
  },
});

export const PostToolbarOption = React.forwardRef(
  (
    {
      animateDirection = "up", // or down
      tooltipContent,
      color = "blue",
      icon,
      stat = 0,
      isActive,
      onClick,
    },
    ref
  ) => {
    const variants = {
      show: {
        opacity: 1,
        y: 0,
        transition: {
          ease: "easeOut",
          duration: 0.5,
        },
      },
      hide:
        animateDirection === "up"
          ? { y: -25, opacity: 0 }
          : { y: 25, opacity: 0 },
    };

    return (
      <HintTooltip content={tooltipContent}>
        <div
          onClick={onClick ? stopBubbling(onClick) : undefined}
          className={cn(
            "flex justify-start items-center text-lg leading-5 group text-color-text-dimmed cursor-pointer",
            isActive && activeTextVariants({ color })
          )}
        >
          <div className="relative inline-block ">
            <div className={cn("leading-5", hoverTextVariants({ color }))}>
              {icon}
            </div>

            <div
              className={cn(
                hoverBgVariants({ color }),
                "absolute top-0 bottom-0 left-0 right-0 -m-2 w-[34px] h-[34px] duration-200 group-hover:rounded-full"
              )}
            />
          </div>

          <div
            className={cn(
              "inline-flex leading-5 text-base",
              hoverTextVariants({ color })
            )}
          >
            <AnimatePresence>
              {stat > 0 && (
                <motion.div
                  key={stat}
                  variants={variants}
                  animate={"show"}
                  initial="hide"
                >
                  <span className="px-1 text-sm">{stat}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </HintTooltip>
    );
  }
);

PostToolbarOption.displayName = "PostToolbarOption";
