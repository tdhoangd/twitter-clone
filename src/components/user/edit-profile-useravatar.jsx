"use client";

import { cn } from "@/utils/helpers";
import Image from "next/image";
import React from "react";

export function EditProfileUseravatar({ className, imagePath }) {
  return (
    <div
      className={cn(
        "p-1 rounded-full overflow-hidden flex flex-col justify-center items-center h-10 w-10 xs:w-24 sm:w-32 xs:h-24 sm:h-32 text-[60px]",
        className
      )}
    >
      {imagePath ? (
        <>
          <Image
            src={imagePath}
            alt="avatar image"
            width={140}
            height={140}
            className="rounded-full h-full w-full object-cover overflow-hidden"
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
