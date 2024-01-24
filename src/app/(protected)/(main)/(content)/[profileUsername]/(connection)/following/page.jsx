"use client";

import { EmptyCard } from "@/components/empty-card";
import { Loading } from "@/components/ui/loading";
import { UserCard } from "@/components/user/user-card";
import { dbFetchFollowingProfiles } from "@/lib/supabase/db";
import { useBoundStore } from "@/store/use-bound-store";
import { EMPTY_MESSAGES } from "@/utils/empty-page-messages";
import React, { useEffect, useState } from "react";

export default function FollowingProfilesPage({ params }) {
  const { profileUsername: username } = params;
  const [targetUser, setTargetUser] = useState(null);
  const user = useBoundStore((state) => state.user);
  const userProfiles = useBoundStore((state) => state.userProfiles);
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const profile = userProfiles.find((p) => p.username === username);
    if (profile) {
      setTargetUser(profile);
    }
  }, [userProfiles, username]);

  useEffect(() => {
    if (targetUser) {
      dbFetchFollowingProfiles(targetUser.id)
        .then((profiles) => {
          setProfiles(profiles);
          setIsLoading(false);
        })
        .catch((error) => console.error(error));
    }
  }, [targetUser]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {profiles?.length > 0 ? (
        profiles.map((profile) => (
          <UserCard key={profile.id} user={profile} variant="inline" />
        ))
      ) : (
        <EmptyCard
          title={
            username === user.username
              ? EMPTY_MESSAGES.following.owner.title
              : EMPTY_MESSAGES.following.other.title(username)
          }
          description={
            username === user.username
              ? EMPTY_MESSAGES.following.owner.description
              : EMPTY_MESSAGES.following.other.description
          }
        />
      )}
    </>
  );
}
