import {
  PinIcon,
  ThreeDotIcon,
  TrashIcon,
  UserPlusIcon,
  UserXIcon,
} from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdonw-menu";
import { Loading } from "@/components/ui/loading";
import { usePostInteractions } from "@/hooks/use-post-interactions";
import { useUserInteractions } from "@/hooks/use-user-interactions";
import { useBoundStore } from "@/store/use-bound-store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function PostDropdownActions({
  variant,
  postId,
  authorId,
  authorUsername,
}) {
  const { user, checkIsFollowing } = useBoundStore((state) => ({
    user: state.user,
    checkIsFollowing: state.checkIsFollowing,
  }));
  const { handleFollow } = useUserInteractions();
  const { handleDelete } = usePostInteractions();
  const isFollowed = checkIsFollowing(authorId);
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-lg min-h-[20px] flex flex-col justify-center items-center text-color-text-dimmed outline-none focus:outline-none focus:shadow-none">
        <div className="relative inline-block group">
          <ThreeDotIcon className="leading-5 group-hover:text-color-blue" />
          <div className=" absolute top-0 right-0 bottom-0 left-0 -m-2 w-[34px] h-[34px] duration-200 hover:opacity-30 hover:bg-color-blue hover:rounded-full"></div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
        {!user ? (
          <Loading />
        ) : user.id === authorId ? (
          <>
            <DropdownMenuItem
              className="flex text-red-700"
              onClick={() => {
                handleDelete(
                  postId,
                  variant === "single" ? () => router.back() : undefined
                );
              }}
            >
              <div className="flex-none pr-3 ">
                <TrashIcon />
              </div>
              <div className="grow">
                <span>Delete</span>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex" disabled>
              <div className="flex-none pr-3">
                <PinIcon />
              </div>
              <div className="grow">
                <span>Unpin/Pin from profile</span>
              </div>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            {isFollowed ? (
              <DropdownMenuItem
                onClick={() =>
                  handleFollow(
                    authorId,
                    authorUsername,
                    checkIsFollowing(authorId)
                  )
                }
                className="flex"
              >
                <div className="flex-none pr-3">
                  <UserXIcon />
                </div>
                <div className="grow">
                  <span>{`Unfollow @${authorUsername}`}</span>
                </div>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={() =>
                  handleFollow(
                    authorId,
                    authorUsername,
                    checkIsFollowing(authorId)
                  )
                }
                className="flex"
              >
                <div className="flex-none pr-3">
                  <UserPlusIcon />
                </div>
                <div className="grow">
                  <span>{`Follow @${authorUsername}`}</span>
                </div>
              </DropdownMenuItem>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
