"use client";

import { EmptyCard } from "@/components/empty-card";
import { EMPTY_MESSAGES } from "@/utils/empty-page-messages";
import { useBoundStore } from "@/store/use-bound-store";
import { PostList } from "@/components/post-list/post-list";
import { usePosts } from "@/hooks/use-posts";
import { dbFetchProfilePosts } from "@/lib/supabase/db";

export default function ProfilePage({ params: { profileUsername } }) {
  const user = useBoundStore((state) => state.user);
  const userProfiles = useBoundStore((state) => state.userProfiles);
  const profile =
    userProfiles.find((user) => user.username === profileUsername) || null;

  const context = usePosts(
    dbFetchProfilePosts,
    `profile-${profileUsername}-posts`,
    { profileId: profile?.id }
  );

  const hasNoPosts = context.posts && context.posts.length === 0;

  return (
    <>
      {hasNoPosts ? (
        <EmptyCard
          title={
            profileUsername === user.username
              ? EMPTY_MESSAGES.posts.owner.title
              : EMPTY_MESSAGES.posts.other.title(profileUsername)
          }
          description={
            profileUsername === user.username
              ? EMPTY_MESSAGES.posts.owner.description
              : EMPTY_MESSAGES.posts.other.description
          }
        />
      ) : (
        <PostList {...context} />
      )}
    </>
  );
}
