"use client";

import { Loading } from "@/components/ui/loading";
import Image from "next/image";
import React, { Suspense } from "react";

export default function UserCover({ imagePath }) {
  return (
    <div className="mt-0.5 h-52 bg-color-bg-3 w-full relative overflow-hidden">
      <Suspense fallback={<Loading />}>
        {imagePath && (
          <Image
            src={imagePath}
            alt="user home cover"
            fill
            sizes="600px 210px"
            priority
          />
        )}
      </Suspense>
    </div>
  );
}
