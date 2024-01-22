"use client";

import { AccountNotFound } from "./account-not-found";
import { ProfileHeader } from "./profile-header";
import { dbFetchProfile } from "@/lib/supabase/db";
import React, { Suspense, useEffect, useState } from "react";
import { UserDetail } from "@/components/user/user-detail";
import { ProfileNav } from "@/app/(protected)/(main)/(content)/[profileUsername]/profile-nav";
import { usePathname } from "next/navigation";
import { useBoundStore } from "@/store/use-bound-store";
import { Loading } from "@/components/ui/loading";

export default function ProfileLayout({ params, children }) {
  const { profileUsername: username } = params;
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  const { userProfiles, addProfileToUserProfiles } = useBoundStore((state) => ({
    userProfiles: state.userProfiles,
    addProfileToUserProfiles: state.addProfileToUserProfiles,
  }));

  useEffect(() => {
    const fetchTargetProfile = async () => {
      let profile =
        userProfiles.find((user) => user.username === username) || null;

      if (!profile) {
        try {
          profile = await dbFetchProfile({ username });
          if (profile) {
            console.log("profileLayout", profile);

            addProfileToUserProfiles(profile);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }

      setProfile(profile);
    };

    fetchTargetProfile();
  }, [userProfiles, username, addProfileToUserProfiles]);

  const header = (
    <ProfileHeader
      name={profile ? profile.name : undefined}
      stat={!profile ? undefined : profile.posts[0].count}
    />
  );

  if (isLoading) {
    return (
      <>
        {header} <Loading />
      </>
    );
  } else if (!profile) {
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

        <ProfileNav activePath={pathname} profileUsername={username} />
        <section className="flex flex-col">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </section>
      </div>
    </>
  );
}
