"use client";

import { EmptyCard } from "@/app/(protected)/(main)/(content)/[profileUsername]/empty-card";

export function AccountNotFound({ profileUsername }) {
  return (
    <>
      <div className="mt-0.5 h-52">
        <div className="h-full bg-color-bg-3"></div>
      </div>

      <div className="relative flex flex-col gap-3 px-4 py-3">
        <div className="mb-16">
          <button
            className="custom-button main-tab accent-tab absolute -mt-3 aspect-square w-24 -translate-y-1/2 overflow-hidden p-0 disabled:cursor-auto disabled:opacity-100 xs:w-32 sm:w-36 [&amp;:hover>figure>span]:brightness-75"
            type="button"
            disabled=""
          >
            <div className="h-full rounded-full bg-color-bg p-1">
              <div className="h-full rounded-full bg-color-bg-2"></div>
            </div>
          </button>
        </div>
        <div className="text-xl font-bold">@{profileUsername}</div>
      </div>

      <EmptyCard
        title="This account doesn't exist"
        description="Try searching for another."
        className="mt-10"
      />
    </>
  );
}
