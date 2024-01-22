"use client";

import React from "react";
import { PostToolbarOption } from "./post-toolbar-option";
import {
  BookmarkIcon,
  ChatIcon,
  HeartFillIcon,
  HeartIcon,
  RepeatIcon,
  ShareIcon,
  UnbookmarkIcon,
} from "@/components/icons";
import { copyToClipboard } from "@/utils/helpers";
import { NewPost } from "@/components/new-post/new-post";
import { usePostInteractions } from "@/hooks/use-post-interactions";

export function PostToolbar({ post }) {
  const { handleLike, handleRepost, handleBookmark } = usePostInteractions();

  return (
    <div className="mt-3 flex gap-1 max-w-full items-baseline">
      <div
        className="flex justify-start grow shrink basis-0"
        onClick={(e) => e.stopPropagation()}
      >
        <NewPost
          asModal
          isReply
          asChild={false}
          modalTriggerComponent={
            <PostToolbarOption
              tooltipContent={"Reply"}
              icon={<ChatIcon />}
              stat={post.reply_count}
            />
          }
          parent={post}
        />
      </div>

      <div className="flex justify-start grow shrink basis-0">
        <PostToolbarOption
          tooltipContent={post.is_reposted ? "UnRePost" : "Repost"}
          icon={<RepeatIcon />}
          onClick={() => handleRepost(post.id, post.is_reposted)}
          color="green"
          isActive={post.is_reposted}
          stat={post.repost_count}
        />
      </div>

      <div className="flex justify-start grow shrink basis-0">
        <PostToolbarOption
          tooltipContent={post.is_liked ? "Unlike" : "Like"}
          icon={post.is_liked ? <HeartFillIcon /> : <HeartIcon />}
          onClick={() => handleLike(post.id, post.is_liked)}
          color="red"
          animateDirection={post.is_liked ? "down" : "up"}
          isActive={post.is_liked}
          stat={post.like_count}
        />
      </div>

      <div className="flex justify-start shrink basis-auto mr-2">
        <PostToolbarOption
          tooltipContent={post.is_bookmarked ? "Unbookmark" : "Bookmark"}
          icon={post.is_bookmarked ? <UnbookmarkIcon /> : <BookmarkIcon />}
          onClick={() => handleBookmark(post.id, post.is_bookmarked)}
          isActive={post.is_bookmarked}
        />
      </div>

      <div className="flex justify-start shrink basis-auto">
        <PostToolbarOption
          tooltipContent={"Share"}
          icon={<ShareIcon />}
          onClick={copyToClipboard}
        />
      </div>
    </div>
  );
}
