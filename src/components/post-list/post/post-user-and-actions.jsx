import React from "react";
import PostDropdownActions from "./post-dropdown-action";
import { UserUsername } from "@/components/user/user-username";
import { UserName } from "@/components/user/user-name";
import PostDate from "./post-date";
import { cn } from "@/utils/helpers";
import { UserTooltip } from "@/components/user/user-tooltip";

export default function PostUserAndActions({
  variant = "list",
  authorId,
  name,
  username,
  createdAt,
  postId,
  ...props
}) {
  return (
    <div className="flex w-full items-baseline justify-between  grow-0">
      <div className="flex min-w-0 shrink items-baseline">
        <div className="flex flex-col max-w-full shrink ">
          <div
            className={cn(
              "flex max-w-full shrink  items-start flex-1 basis-auto truncate",
              {
                "flex-col items-start": variant === "single",
              }
            )}
          >
            <div className="flex shrink truncate">
              <UserTooltip username={username}>
                <UserName
                  name={name}
                  username={username}
                  className="hover:underline"
                />
              </UserTooltip>
            </div>

            <div
              className={cn("flex shrink truncate", {
                "ml-1": variant !== "single",
              })}
            >
              <UserTooltip username={username}>
                <UserUsername username={username} />
              </UserTooltip>
            </div>

            {variant !== "single" && (
              <>
                <div className="px-1 text-color-text-dimmed shrink-0">
                  <span>·</span>
                </div>

                <div className="mr-2 shrink-0 whitespace-nowrap leading-5 text-color-text-dimmed hover:underline ">
                  <PostDate createdAt={createdAt} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {variant !== "short" && (
        <div className="shrink-0 flex-10 basis-10 relative">
          <div className="ml-6">
            <PostDropdownActions
              variant={variant}
              postId={postId}
              authorId={authorId}
              authorUsername={username}
              {...props}
            />
          </div>
        </div>
      )}
    </div>
  );
}
