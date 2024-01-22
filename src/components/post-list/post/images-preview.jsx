"use client";

import { cn, stopBubbling } from "@/utils/helpers";
import Image from "next/image";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TRANSITION_VARIANTS } from "@/utils/transition-utils";
import { Button } from "@/components/ui/button";
import { CloseIcon } from "@/components/icons";

export function ImagesPreview({ images, removeImage }) {
  return (
    <div
      className={cn("mt-3 w-full rounded-2xl overflow-hidden", {
        "grid grid-cols-2 h-[300px] gap-3": images.length > 1,
        " grid-rows-2 ": images.length > 2,
      })}
    >
      <AnimatePresence mode="wait">
        {images.map((image, index) => {
          return (
            <motion.div
              key={index}
              animate="enter"
              exit="exit"
              initial="exit"
              variants={TRANSITION_VARIANTS.scaleSpring}
              className={cn("overflow-hidden relative h-full w-full ", {
                "row-span-2": images.length === 3 && index === 0,
              })}
            >
              <Image
                width={100}
                height={100}
                key={index}
                src={image.image_url}
                alt="Uploaded"
                className="object-fill w-full h-full "
              />
              {removeImage && (
                <div className="absolute z-[300] top-1 right-1 min-w-[32px] min-h-[32px]">
                  <Button
                    size="icon"
                    variant="secondary"
                    textSize="xl"
                    onClick={() => stopBubbling(removeImage(image.id))}
                  >
                    <CloseIcon />
                  </Button>
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
