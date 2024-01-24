"use client";

import { cn } from "@/utils/helpers";
import Link from "next/link";
import React from "react";

export function UserName({ name, username, className }) {
  return (
    <Link
      onClick={(e) => e.stopPropagation()}
      href={username ? `/${username}` : "#"}
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "clip",
      }}
      className={cn(
        "outline-none cursor-pointer leading-5 text-color-text-main font-bold hover:underline overflow-hidden truncate",
        className
      )}
    >
      <span>
        {name ? name : "No name"}dsfjshf
        sgfhjdffmsfshfgshfjgfhjsdfsfsfsfsdadaddadadas gfhs
      </span>
    </Link>
  );
}
