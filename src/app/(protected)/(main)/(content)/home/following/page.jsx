"use client";

import { PostList } from "@/components/post-list/post-list";
import { usePosts } from "@/hooks/use-posts";
import { dbFetchFollowingPosts } from "@/lib/supabase/db";
import { useBoundStore } from "@/store/use-bound-store";
import React from "react";

export default function HomeFollowingPage() {
  const following = useBoundStore((state) => state.following);

  const context = usePosts(dbFetchFollowingPosts, "following", {
    following: Array.from(following),
  });
  return <PostList {...context} />;
}
