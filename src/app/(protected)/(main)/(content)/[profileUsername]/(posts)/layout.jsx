"use client";

import { AccountNotFound } from "./account-not-found";
import { ProfileHeader } from "./profile-header";
import React, { Suspense, useEffect, useState } from "react";
import { UserDetail } from "@/components/user/user-detail";
import { ProfileNavs } from "@/app/(protected)/(main)/(content)/[profileUsername]/(posts)/profile-navs";
import { usePathname } from "next/navigation";
import { useBoundStore } from "@/store/use-bound-store";
import { Loading } from "@/components/ui/loading";

export default function ProfilePostsLayout({ params, children }) {
  const { profileUsername: username } = params;
  const [profile, setProfile] = useState(null);
  const pathname = usePathname();

  const userProfiles = useBoundStore((state) => state.userProfiles);

  useEffect(() => {
    const p = userProfiles.find((uProfile) => uProfile.username === username);
    if (p) {
      setProfile(p);
    }
  }, [userProfiles, username]);

  const header = (
    <ProfileHeader
      name={profile ? profile.name : undefined}
      stat={!profile ? undefined : profile.posts[0].count}
    />
  );

  if (!profile) {
    return (
      <>
        {header}
        <AccountNotFound profileUsername={username} />
      </>
    );
  }

  return (
    <>
      {header}
      <div className="flex flex-col grow">
        <div className="">
          <UserDetail username={username} />
        </div>

        <ProfileNavs activePath={pathname} profileUsername={username} />
        <section className="flex flex-col">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </section>
      </div>
    </>
  );
}
