"use client";
import Error from "@/components/error";
import { ChatIcon } from "@/components/icons";
import { PageHeaderWrapper } from "@/components/layouts/page-header-wrapper";
import { NewPost } from "@/components/new-post/new-post";
import { PostList } from "@/components/post-list/post-list";
import { Post } from "@/components/post-list/post/post";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";

import { usePost } from "@/hooks/use-post";
import { usePosts } from "@/hooks/use-posts";
import { dbFetchPost, dbFetchRepliesToPost } from "@/lib/supabase/db";
import { useBoundStore } from "@/store/use-bound-store";
import { TOAST_MESSAGES } from "@/utils/toast-messages";
import { useRouter, useSearchParams } from "next/navigation";

export default function PostPage({ params: { postId } }) {
  const searchParameters = useSearchParams();
  const repostId = searchParameters.get("repost_id");
  const { post, isLoading } = usePost(repostId, postId);

  const postKey = repostId || postId;
  const context = usePosts(
    dbFetchRepliesToPost,
    `reply_${postId}`,
    {
      postId,
    },
    false
  );

  if (isLoading) {
    return (
      <div className="mt-10">
        <Loading />
      </div>
    );
  } else if (!isLoading && !post) {
    return (
      <>
        <PageHeaderWrapper></PageHeaderWrapper>
        <Error message="Somthing went wrong. Try reloading." />
      </>
    );
  } else {
    return (
      <>
        <PageHeaderWrapper className="">
          <div className="font-bold leading-6 text-xl truncate">
            <span className="text-ellipsis whitespace-nowrap">Post</span>
          </div>
        </PageHeaderWrapper>

        <NewPost
          asModal
          parent={post}
          isReply
          modalTriggerComponent={
            <div className="z-20 fixed bottom-20 right-[22px]  w-full flex items-center justify-end 2xl:justify-start xs:hidden">
              <Button className="w-14 h-14 text-white">
                <span className="font-color-text-main text-2xl">
                  <ChatIcon className="text-3xl" />
                </span>
              </Button>
            </div>
          }
        />

        {post && <Post post={post} variant="single" />}

        {post && (
          <div className="border-b border-color-border pb-3">
            <NewPost parent={post} isReply />
          </div>
        )}

        {post && <PostList {...context} />}
      </>
    );
  }
}
