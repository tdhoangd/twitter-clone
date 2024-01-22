"use client";

import { ArrowBackIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import HintTooltip from "@/components/ui/hint-tooltip";
import { cn } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import React from "react";

export function PageHeaderWrapper({
  withNavigationBack = true,
  className,
  children,
}) {
  const router = useRouter();

  const backButton = (
    <div className="min-w-[56px] min-h-[32px] self-stretch justify-center items-start flex flex-col">
      <HintTooltip content="Back" sideOffset={"0"}>
        <Button
          variant="primary"
          size="icon"
          textSize="xl"
          onClick={() => router.back()}
        >
          <ArrowBackIcon />
        </Button>
      </HintTooltip>
    </div>
  );

  return (
    <div className="sticky -top-[0.5px] z-30">
      <div
        className={cn(
          "px-4 h-[53px] flex items-center mx-auto bg-color-bg bg-opacity-80 backdrop-blur-md w-full",
          className
        )}
      >
        {withNavigationBack && backButton}

        {/* <div className="grow max-w-full truncate flex flex-col justify-start items-start"> */}
        {children}
        {/* </div> */}
      </div>
    </div>
  );
}
