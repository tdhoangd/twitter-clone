"use client";

import { cn } from "@/utils/helpers";
import Link from "next/link";
import React from "react";

export function UserUsername({ username, className }) {
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
        "outline-none cursor-pointer leading-5 text-color-text-dimmed overflow-hidden truncate",
        "flex flex-col basis-auto",
        className
      )}
    >
      <span>@{username}</span>
    </Link>
  );
}
