"use client";

import Error from "@/components/error";
import { PageHeaderWrapper } from "@/components/layouts/page-header-wrapper";
import { PageNavItem } from "@/components/page-nav-item";
import {
  dbFetchFollowersProfiles,
  dbFetchFollowingProfiles,
} from "@/lib/supabase/db";
import { useBoundStore } from "@/store/use-bound-store";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ProfileConnectionLayout({ params, children }) {
  const { profileUsername: username } = params;
  const pathname = usePathname();
  const [profile, setProfile] = useState(null);

  const userProfiles = useBoundStore((state) => state.userProfiles);

  useEffect(() => {
    if (userProfiles?.length > 0) {
      const profile = userProfiles.find((p) => p.username === username);
      if (profile) {
        setProfile(profile);
      }
    }
  }, [userProfiles, username]);

  return (
    <>
      <PageHeaderWrapper>
        <div className="ml-3 w-full overflow-hidden">
          <div className="font-bold leading-6 text-xl truncate">
            {profile && (
              <span className="whitespace-nowrap text-ellipsis">
                {profile.name}
              </span>
            )}
          </div>

          <div className="text-color-text-dimmed text-xs leading-4 truncate">
            <div className="whitespace-nowrap text-ellipsis">
              <span>@{username}</span>
            </div>
          </div>
        </div>
      </PageHeaderWrapper>

      <nav
        className="sticky top-[52.5px] z-10 flex items-center border-b border-color-border bg-color-bg bg-opacity-80  backdrop-blur-sm"
        role="navigation"
      >
        <div className="flex outline-none items-center grow justify-between">
          {["Followers", "Following"].map((title) => {
            const link = `/${username}/${title.toLowerCase()}`;

            return (
              <PageNavItem
                key={title}
                title={title}
                link={link}
                active={pathname === link}
              />
            );
          })}
        </div>
      </nav>

      {profile ? (
        <>{children}</>
      ) : (
        <div className="">
          <Error message={"Something went wrong. Try reloading"} />
        </div>
      )}
    </>
  );
}
