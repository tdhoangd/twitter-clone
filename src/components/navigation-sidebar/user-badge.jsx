"use client";
import { UserAvatar } from "@/components/user/user-avatar";
import { ThreeDotIcon } from "@/components/icons";

export function UserBadge({ user }) {
  return (
    <div className="p-3 cursor-pointer flex flex-row items-center justify-center shrink-0 grow-0 hover:bg-color-text-main/10 rounded-full">
      <div className="flex-none flex flex-col justify-center items-center">
        <UserAvatar
          size={40}
          name={user.name}
          imagePath={user.avatar_image_path}
          username={user.username}
        />
      </div>

      <div className="grow text-sm mx-3 truncate hidden 2xl:flex 2xl:flex-col justify-start items-start">
        <div className="font-bold">
          <span>{user.name}</span>
        </div>
        <div className="">
          <span className="text-color-text-dimmed">@{user.username}</span>
        </div>
      </div>

      <div className="hidden 2xl:block flex-none">
        <ThreeDotIcon />
      </div>
    </div>
  );
}
