import { Button } from "@/components/ui/button";
import { useUserInteractions } from "@/hooks/use-user-interactions";
import { useBoundStore } from "@/store/use-bound-store";
import React, { useEffect, useState } from "react";

export function FollowButton({ userTargetId, userTargetUsername, large }) {
  const { checkIsFollowing, following } = useBoundStore((state) => ({
    checkIsFollowing: state.checkIsFollowing,
    following: state.following,
  }));

  const [hover, setHover] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const { handleFollow } = useUserInteractions();

  useEffect(() => {
    if (checkIsFollowing) {
      setIsFollowed(checkIsFollowing(userTargetId));
    }
  }, [checkIsFollowing, following, userTargetId]);

  let buttonText;
  if (isFollowed) {
    buttonText = hover ? "Unfollow" : "Following";
  } else {
    buttonText = "Follow";
  }

  return (
    <>
      <Button
        variant={isFollowed ? "outlineRed" : "primaryInverse"}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        size={large ? "large" : "default"}
        onClick={() =>
          handleFollow(
            userTargetId,
            userTargetUsername,
            checkIsFollowing(userTargetId)
          )
        }
      >
        <div className="text-center w-[72px]">
          <span>{buttonText}</span>
        </div>
      </Button>
    </>
  );
}
