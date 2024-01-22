"use client";

import { PostList } from "@/components/post-list/post-list";
import { usePosts } from "@/hooks/use-posts";
import { dbFetchTimeline } from "@/lib/supabase/db";

export default function HomePage({}) {
  const context = usePosts(dbFetchTimeline, "foryou");

  return (
    <>
      <PostList {...context} />
    </>
  );
}
