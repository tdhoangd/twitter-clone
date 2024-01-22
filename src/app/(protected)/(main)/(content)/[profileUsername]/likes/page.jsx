"use client";

import { EmptyCard } from "@/app/(protected)/(main)/(content)/[profileUsername]/empty-card";
import { EMPTY_MESSAGES } from "@/utils/empty-page-messages";
import { PostList } from "@/components/post-list/post-list";
import { usePosts } from "@/hooks/use-posts";
import { dbFetchProfileLikes } from "@/lib/supabase/db";
import { useBoundStore } from "@/store/use-bound-store";
import React from "react";

export default function LikesPage({ params: { profileUsername } }) {
  const user = useBoundStore((state) => state.user);
  const userProfiles = useBoundStore((state) => state.userProfiles);
  const profile =
    userProfiles.find((user) => user.username === profileUsername) || null;

  const context = usePosts(
    dbFetchProfileLikes,
    `profile-${profileUsername}-likes`,
    { profileId: profile?.id }
  );

  const hasNoPosts = context.posts && context.posts.length === 0;

  return (
    <>
      {hasNoPosts ? (
        <EmptyCard
          title={
            profileUsername === user.username
              ? EMPTY_MESSAGES.likes.owner.title
              : EMPTY_MESSAGES.likes.other.title(profileUsername)
          }
          description={
            profileUsername === user.username
              ? EMPTY_MESSAGES.likes.owner.description
              : EMPTY_MESSAGES.likes.other.description
          }
        />
      ) : (
        <PostList {...context} />
      )}
    </>
  );
}
