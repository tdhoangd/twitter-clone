"use client";

import { CalendarIcon, LinkIcon, ThreeDotIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdonw-menu";
import { Loading } from "@/components/ui/loading";
import { EditProfile } from "@/components/user/edit-profile";
import { FollowButton } from "@/components/user/follow-button";
import { UserAvatar } from "@/components/user/user-avatar";
import UserCover from "@/components/user/user-cover";
import UserFollowStats from "@/components/user/user-follow-stats";
import { useBoundStore } from "@/store/use-bound-store";
import { copyToClipboard, getMonthYear } from "@/utils/helpers";
import React, { useEffect, useState } from "react";

export function UserDetail({ username }) {
  const [targetUserProfile, setTargetUserProfile] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  const { user, userProfiles } = useBoundStore((state) => ({
    user: state.user,
    userProfiles: state.userProfiles,
  }));

  useEffect(() => {
    let profile =
      userProfiles.find((user) => user.username === username) || null;
    if (profile) {
      setTargetUserProfile(profile);
      setIsOwner(user.id === profile.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfiles]);

  if (!targetUserProfile) {
    return <Loading />;
  }

  const bigAvatar = (
    <div className="mb-16">
      <button
        className="custom-button main-tab accent-tab absolute -mt-3 aspect-square w-24 -translate-y-1/2 overflow-hidden p-0  xs:w-32 sm:w-36  "
        type="button"
        disabled=""
      >
        <div className="h-full rounded-full bg-color-bg flex flex-col justify-center items-center ">
          <UserAvatar
            name={targetUserProfile.name}
            imagePath={
              targetUserProfile.avatar_image_path
                ? targetUserProfile.avatar_image_path
                : undefined
            }
            className="xs:w-32 sm:w-36 xs:h-32 sm:h-36 p-1 text-[60px]"
            size="140"
          />
        </div>
      </button>
    </div>
  );

  return (
    <>
      <UserCover imagePath={targetUserProfile.cover_image_path} />
      <div className="relative flex flex-col  px-4 py-3">
        <div className="flex justify-between">
          {bigAvatar}
          <div className="flex justify-end items-start gap-1">
            {isOwner ? (
              <EditProfile />
            ) : (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="p-1 focus:outline-none outline-none"
                    >
                      <div className="">
                        <ThreeDotIcon />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={copyToClipboard}>
                      <LinkIcon className="pr-3 text-base" size="30" />
                      <div className="">Copy link to profile</div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <FollowButton
                  userTargetId={targetUserProfile.id}
                  userTargetUsername={username}
                />
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col mt-1 mb-3 grow-0">
          <div className="leading-6 text-xl font-bold grow-0 truncate">
            <span className="truncate overflow-hidden">
              {targetUserProfile.name}
            </span>
          </div>
          <div className="text-color-text-dimmed truncate">
            <span className="">@{targetUserProfile.username}</span>
          </div>
        </div>

        {targetUserProfile.bio && (
          <div className="mb-3 ">
            <div className="flex flex-col leading-5">
              <pre>{targetUserProfile.bio}</pre>
            </div>
          </div>
        )}

        <div className="mb-3 block">
          <div className="flex flex-wrap">
            <span className="mr-3 text-color-text-dimmed flex items-center">
              <CalendarIcon className="mr-1" />
              <span>{getMonthYear(targetUserProfile.created_at)}</span>
            </span>
          </div>
        </div>

        <div className="">
          <UserFollowStats
            followersCount={targetUserProfile.followers_count}
            followingCount={targetUserProfile.following_count}
            username={targetUserProfile.username}
          />
        </div>
      </div>
    </>
  );
}
