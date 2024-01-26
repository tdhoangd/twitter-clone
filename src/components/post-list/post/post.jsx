"use client";

import { UserAvatar } from "@/components/user/user-avatar";
import { cn } from "@/utils/helpers";
import { motion } from "framer-motion";
import React, { useEffect, memo, forwardRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PostToolbar } from "./post-toolbar";
import PostUserAndActions from "./post-user-and-actions";
import { RepeatIcon } from "@/components/icons";
import PostDate from "@/components/post-list/post/post-date";
import { ImagesPreview } from "@/components/post-list/post/images-preview";
import { TRANSITION_VARIANTS } from "@/utils/transition-utils";
import { useBoundStore } from "@/store/use-bound-store";

const PostComponent = (
  {
    post,
    hasParent,
    hasChildren,
    variant = "list", // ["list", "short", "single"]
  },
  ref
) => {
  const router = useRouter();
  const currentPageKey = useBoundStore((state) => state.currentPageKey);

  const handleClickArticle = (event) => {
    event.stopPropagation();
    if (post.reposter && post.reposter.id) {
      router.push(`/posts/${post.id}?repost_id=${post.key}`);
    } else {
      router.push(`/posts/${post.id}`);
    }
  };

  const user = useBoundStore((state) => state.user);
  const [author, setAuthor] = useState(post.author);

  useEffect(() => {
    if (post.author.id === user.id) {
      setAuthor({
        id: user.id,
        name: user.name,
        username: user.username,
        avatar_image_path: user.avatar_image_path,
      });
    }
  }, [user, post.author.id]);

  // // Log on mount and update
  // useEffect(() => {
  //   console.log(`Post component for post ID ${post.id} updated.`, post);
  // }, [post]);

  const renderTopbar = (
    <div className="basis-[40px] mb-[2px] mr-3 grow-0 ">
      <div className="w-[2px] bg-color-text-dimmed mx-auto h-full"></div>
    </div>
  );

  const renderTop = (
    <div className="flex flex-col w-max-full grow-0 ">
      <div className="flex text-xs text-color-text-dimmed">
        {((variant === "single" && post.reply_to_id) || hasParent) &&
          renderTopbar}

        <div className="flex mb-1 -mt-1 justify-center items-center pt-3">
          {((variant === "single" && post.reposter?.id) ||
            (post.reposter?.id && !hasParent)) && (
            <>
              <div className="text-sm mr-3 ml-4">
                <RepeatIcon />
              </div>
              <div className="flex flex-col grow shrink-0 basis-0 hover:underline cursor-pointer ">
                {/* icon reposted??? */}
                {/*  pinned or rePostedd */}
                {post.reposter?.id === user.id
                  ? "You"
                  : post.reposter.name}{" "}
                reposted
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const renderContent = (
    <div className="w-full">
      <div className="">
        <pre>{post.content}</pre>
      </div>
      {post.images && post.images.length > 0 && (
        <ImagesPreview images={post.images} />
      )}
    </div>
  );

  return (
    <motion.article
      ref={ref}
      variants={TRANSITION_VARIANTS.scaleFadeIn}
      initial="enter"
      animate="enter"
      exit="exit"
    >
      {/* hover:bg-color-dark/10 */}
      <article
        onClick={variant === "list" ? handleClickArticle : undefined}
        className={cn("px-4", {
          " hover:bg-color-bg-3 cursor-pointer ": variant === "list",
          "border-b border-color-border": !hasChildren && variant === "list",
        })}
      >
        <div
          className={cn("flex flex-col flex-auto items-stretch w-full", {
            "border-b border-color-border": variant === "single",
          })}
        >
          {/* head, reply to @??? */}
          {variant !== "short" && renderTop}

          <div className="flex min-w-full max-w-full items-stretch">
            <div className="flex flex-col basis-[40px] items-center shrink-0 grow-0 mr-3 overflow-hidden">
              <UserAvatar
                size={40}
                name={author.name}
                username={author.username}
                imagePath={author.avatar_image_path}
              />
              {((hasChildren && variant === "list") || variant === "short") && (
                <div className="w-[2px] bg-color-text-dimmed grow mt-1 mx-auto"></div>
              )}
            </div>

            <div className="flex min-w-0 w-full 2sm:max-w-[514px] flex-col pb-3">
              {/* w-full w-[calc(100%-84px)]  */}
              <PostUserAndActions
                variant={variant}
                authorId={author.id}
                name={author.name}
                username={author.username}
                createdAt={post.created_at}
                postId={post.id}
              />

              {/* {isReply && <div> Is reply</div>} */}

              {variant === "list" &&
                post.reply_to_id &&
                !hasParent &&
                !currentPageKey?.startsWith("reply_") && (
                  <div
                    className={cn({
                      "mt-2": variant === "short",
                    })}
                  >
                    <div className="text-color-text-dimmed">
                      Replying to
                      <span className="text-color-accent hover:underline ml-1">
                        {post.reply_to_username}
                      </span>
                    </div>
                  </div>
                )}

              <div>{/* replying to, mb-2px */}</div>

              {variant === "list" && renderContent}

              {variant === "short" && (
                <div className="mt-2 text-color-text-dimmed">
                  Replying to{" "}
                  <span className="text-color-accent">
                    <span>@{author.username}</span>
                    {post.reposter &&
                      post.reposter.username !== author.username && (
                        <span className="ml-1">@{post.reposter.username}</span>
                      )}
                  </span>
                </div>
              )}

              {variant === "list" && <PostToolbar post={post} />}
            </div>
          </div>

          {variant === "single" && (
            <div className="pb-3">
              {renderContent}
              <PostDate full createdAt={post.created_at} className="my-4" />
              <div className="border-t border-color-border">
                <PostToolbar post={post} />
              </div>
            </div>
          )}
        </div>
      </article>
    </motion.article>
  );
};

const Post = memo(forwardRef(PostComponent));
Post.displayName = "Post";

export { Post };
