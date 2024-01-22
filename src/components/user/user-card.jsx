"use client";

import { FollowButton } from "@/components/user/follow-button";
import { UserAvatar } from "@/components/user/user-avatar";
import UserFollowStats from "@/components/user/user-follow-stats";
import { UserName } from "@/components/user/user-name";
import { UserUsername } from "@/components/user/user-username";
import { useBoundStore } from "@/store/use-bound-store";
import React from "react";

export function UserCard({ user }) {
  const onwer = useBoundStore((state) => state.user);

  return (
    <>
      <div className="m-4 w-72 flex flex-col ">
        <div className="flex justify-between items-start">
          <div className="w-16 h-16 bg-cc-bg-tertiary  rounded-full flex flex-col justify-center items-center">
            <UserAvatar
              name={user.name}
              username={user.username}
              imagePath={user.avatar_image_path}
              className="h-16 w-16"
              asLink
            />
          </div>

          {onwer.id !== user.id && (
            <div className="flex flex-row justify-end gap-1">
              <FollowButton type="follow" />
            </div>
          )}
        </div>

        <div className="flex flex-col items-start mt-2">
          <UserName name={user.name} username={user.username} />
          <UserUsername username={user.username} />
        </div>

        <div className="mt-3">{user.bio}</div>
        <div className="mt-3 flex flex-row justify-start items-center">
          <UserFollowStats
            followersCount={user.followers_count}
            followingCount={user.following_count}
            username={user.username}
          />
        </div>
      </div>
    </>
  );
}
