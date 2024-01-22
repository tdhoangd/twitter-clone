"use client";

import { dbUpdateFollow, dbUpdateUserProfile } from "@/lib/supabase/db";
import { useBoundStore } from "@/store/use-bound-store";
import { TOAST_MESSAGES } from "@/utils/toast-messages";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUserInteractions = () => {
  const { toggleFollow, user, updateUser } = useBoundStore((state) => ({
    user: state.user,
    toggleFollow: state.toggleFollow,
    updateUser: state.updateUser,
  }));

  const followMutation = useMutation({
    mutationFn: ({ targetUserId, targetUserUsername, isFollowed, userId }) =>
      dbUpdateFollow({
        user_id: userId,
        user_target_id: targetUserId,
        type: isFollowed ? "unfollow" : "follow",
      }),
    onMutate: async ({ targetUserId }) => {
      toggleFollow(targetUserId);
    },
    onSuccess: async (data, { targetUserUsername, isFollowed }, context) => {
      if (isFollowed) {
        toast.success(TOAST_MESSAGES.unfollow.success(targetUserUsername));
      } else {
        toast.success(TOAST_MESSAGES.follow.success(targetUserUsername));
      }
    },
    onError: async (
      error,
      { targetUserId, targetUserUsername, isFollowed },
      context
    ) => {
      toggleFollow(targetUserId);
      if (isFollowed) {
        toast.error(TOAST_MESSAGES.unfollow.error(targetUserUsername));
      } else {
        toast.error(TOAST_MESSAGES.follow.error(targetUserUsername));
      }
    },
  });

  const handleFollow = (targetUserId, targetUserUsername, isFollowed) => {
    console.log("handleFollow", targetUserId, targetUserUsername, isFollowed);

    followMutation.mutate({
      targetUserId,
      targetUserUsername,
      isFollowed,
      userId: user.id,
    });
  };

  const editProfileMutation = useMutation({
    mutationFn: ({
      user,
      name,
      bio,
      location,
      website,
      avatarImage,
      coverImage,
    }) =>
      dbUpdateUserProfile({
        user,
        name,
        bio,
        location,
        website,
        avatarImage,
        coverImage,
      }),
    onSuccess: async (data, variables, context) => {
      toast.success("Updated profile");
      // updateUser(data);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      // Handle the error appropriately
    },
  });

  const handleEditProfile = ({
    name,
    bio,
    location,
    website,
    avatarImage,
    coverImage,
  }) => {
    console.log("calling use-user-interaction");

    editProfileMutation.mutate(
      {
        user,
        name,
        bio,
        location,
        website,
        avatarImage,
        coverImage,
      },
      {
        onSuccess: (data) => {
          console.log("second onSuccess", data);
          updateUser(data);
        },
      }
    );
  };

  return {
    handleFollow,
    handleEditProfile,
  };
};
