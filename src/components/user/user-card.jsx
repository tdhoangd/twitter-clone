"use client";

import { Button } from "@/components/ui/button";
import { FollowButton } from "@/components/user/follow-button";
import { UserAvatar } from "@/components/user/user-avatar";
import UserFollowStats from "@/components/user/user-follow-stats";
import { UserName } from "@/components/user/user-name";
import { UserUsername } from "@/components/user/user-username";
import { useBoundStore } from "@/store/use-bound-store";
import { cn } from "@/utils/helpers";
import React from "react";

export function UserCard({
  user,
  variant = "modal", // modal, inline, inlineShort
}) {
  const currentUser = useBoundStore((state) => state.user);
  const { name, username } = user;

  return (
    <div
      className={cn({
        "px-4 py-3 max-w-[598px]": true,
        "cursor-pointer p-1 hover:bg-color-dark/5 px-4 py-3":
          variant !== "modal",
      })}
    >
      <div
        className={cn({
          "w-72 flex flex-col": variant === "modal",
          "w-full flex flex-row": variant !== "modal",
        })}
      >
        <div className="flex justify-between items-start">
          <div
            className={cn(
              "bg-cc-bg-tertiary rounded-full flex flex-col justify-center items-center",
              { "w-16 h-16": variant === "modal", "mr-3": variant !== "modal" }
            )}
          >
            <UserAvatar
              name={user.name}
              username={user.username}
              imagePath={user.avatar_image_path}
              className={variant === "modal" && "w-16 h-16"}
              asLink
            />
          </div>

          {currentUser.id !== user.id && variant === "modal" && (
            <div className="flex flex-row justify-end gap-1">
              <FollowButton type="follow" />
            </div>
          )}
        </div>

        <div className="flex flex-col shrink min-w-0">
          <div className={cn("flex shrink", { "mt-2": variant === "modal" })}>
            <div className="flex min-w-0 shrink items-baseline">
              <div className="flex flex-col max-w-full shrink ">
                <div
                  className={cn(
                    "flex flex-col max-w-full shrink  items-start flex-1 basis-auto truncate"
                  )}
                >
                  <div className="flex shrink truncate">
                    <UserName
                      name={name}
                      username={username}
                      className="hover:underline"
                    />
                  </div>

                  <div className="flex shrink truncate">
                    <UserUsername username={username} />
                  </div>
                </div>
              </div>
            </div>

            {variant !== "modal" && (
              <div className="block flex-basis w-20 ml-3">
                {/* TODO: add props to followbutton */}
                <FollowButton userTargetId={""} userTargetUsername={""} />
              </div>
            )}
          </div>

          {variant !== "inlineShort" && (
            <div
              className={cn({
                "mt-3": variant === "modal",
                "mt-1": variant === "inline",
              })}
            >
              {user.bio}
            </div>
          )}

          {variant === "modal" && (
            <div className="mt-3 flex flex-row justify-start items-center">
              <UserFollowStats
                followersCount={user.followers_count}
                followingCount={user.following_count}
                username={user.username}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
