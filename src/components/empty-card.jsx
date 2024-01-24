"use client";

import { cn } from "@/utils/helpers";

export function EmptyCard({ title, description, className }) {
  return (
    <div
      className={cn(
        "max-w-[400px] self-center w-full my-8 mx-auto px-5",
        className
      )}
    >
      <div className="flex flex-col ">
        <div className="leading-9 text-left text-3xl font-bold mb-2">
          <span className="break-words">{title}</span>
        </div>
        <div className="text-left leading-5 mb-7 text-color-text-dimmed">
          <div className="break-words">{description}</div>
        </div>
      </div>
    </div>
  );
}
