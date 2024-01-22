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
    <div className="flex w-full items-center justify-between leading-5">
      <div className="flex min-w-0 flex-1">
        <div
          className={cn("flex  min-w-0 flex-1", {
            "flex-col items-start": variant === "single",
          })}
        >
          <UserTooltip username={username}>
            <UserName
              name={name}
              username={username}
              className="hover:underline"
            />
          </UserTooltip>
          {/* <div > */}
          <UserTooltip username={username}>
            <UserUsername
              username={username}
              className={cn({ "ml-1": variant !== "single" })}
            />
          </UserTooltip>
          {/* </div> */}

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

      {variant !== "short" && (
        <div className="shrink-0">
          <div className="ml-2">
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
