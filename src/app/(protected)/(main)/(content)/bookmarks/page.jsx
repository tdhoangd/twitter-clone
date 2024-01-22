"use client";

import { PageHeaderWrapper } from "@/components/layouts/page-header-wrapper";
import { PostList } from "@/components/post-list/post-list";
import { Loading } from "@/components/ui/loading";
import { usePosts } from "@/hooks/use-posts";
import { dbFetchBookmarkPosts } from "@/lib/supabase/db";
import { useBoundStore } from "@/store/use-bound-store";
import React from "react";

export default function BookmarkPage({}) {
  const user = useBoundStore((state) => state.user);

  const context = usePosts(dbFetchBookmarkPosts, "owner_bookmarks");

  if (context.status === "pending") return <Loading />;

  return (
    <>
      <PageHeaderWrapper withNavigationBack={true}>
        <div className="w-full">
          <div className="font-bold leading-6 text-xl truncate">
            <span>Bookmarks</span>
          </div>
          <div className="text-color-text-dimmed text-sm leading-4 truncate">
            <span>@{user.username}</span>
          </div>
        </div>
      </PageHeaderWrapper>

      <PostList {...context} />
    </>
  );
}
