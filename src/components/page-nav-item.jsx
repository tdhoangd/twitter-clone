"use client";

import { cn } from "@/utils/helpers";
import Link from "next/link";

export function PageNavItem({ title, link, active }) {
  return (
    <Link
      href={!active ? link : "#"}
      className="py-4 px-4 relative w-1/2 flex justify-center h-[53px] hover:bg-color-text-main/10 cursor-pointer"
    >
      <div className="min-w-0 inline-block relative h-[35px] font-semibold">
        <span
          className={cn({
            "text-color-text-main font-bold": active,
            "text-color-text-dimmed": !active,
          })}
        >
          {title}
        </span>

        {active && (
          <div className="h-1 bg-color-accent absolute bottom-0 left-0 right-0 rounded">
            {/* active/underline bar */}
          </div>
        )}
      </div>
    </Link>
  );
}
