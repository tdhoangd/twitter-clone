"use client";

import {
  dbCreateNewPost,
  dbDeletePost,
  dbFetchPost,
  dbUpdateBookmark,
  dbUpdateLike,
  dbUpdateRepost,
} from "@/lib/supabase/db";
import { useBoundStore } from "@/store/use-bound-store";
import { TOAST_MESSAGES } from "@/utils/toast-messages";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const usePostInteractions = () => {
  const {
    userId,
    toggleLike,
    toggleRepost,
    addRepostPost,
    toggleBookmark,
    deletePost,
    addPost,
  } = useBoundStore((state) => ({
    toggleLike: state.toggleLike,
    toggleRepost: state.toggleRepost,
    toggleBookmark: state.toggleBookmark,
    userId: state.user.id,
    deletePost: state.deletePost,
    addPost: state.addPost,
    addRepostPost: state.addRepostPost,
  }));

  const likeMutation = useMutation({
    mutationFn: ({ userId, postId, isLiked }) => {
      dbUpdateLike({
        user_id: userId,
        post_id: postId,
        type: isLiked ? "unlike" : "like",
      });
    },
    onMutate: async ({ postId, isLiked }) => {
      console.log("RUNNING HERE");
      await toggleLike(postId, isLiked);
    },
    onSuccess: async (data, { isLiked }, context) => {
      if (!isLiked) {
        toast.success(TOAST_MESSAGES.like.success());
      }
    },
    onError: async (error, { postId, isLiked }, context) => {
      console.error("Error on likeMutation:", error);
      toggleLike(postId, !isLiked);
      toast.error(TOAST_MESSAGES.like.error);
    },
  });

  const handleLike = (postId, isLiked) => {
    console.log("calll handlelike ", postId, isLiked, userId);
    likeMutation.mutate({ postId, userId, isLiked });
  };

  const repostMutation = useMutation({
    mutationFn: ({ userId, postId, isReposted }) =>
      dbUpdateRepost({
        user_id: userId,
        post_id: postId,
        type: isReposted ? "unrepost" : "repost",
      }),
    onMutate: async ({ postId, isReposted }) => {
      toggleRepost(postId, isReposted);
    },
    onError: async (error, variables, context) => {
      console.error("Error on repostMutation:", error);
      toggleRepost(postId, !isReposted);
    },
    onSuccess: async (data, { postId, isReposted }, context) => {
      if (!isReposted) {
        addRepostPost(data.id, postId);
      }
    },
  });

  const handleRepost = (postId, isReposted) => {
    repostMutation.mutate({ postId, userId, isReposted });
  };

  const bookmarkMutation = useMutation({
    mutationFn: ({ userId, postId, isBookmarked }) =>
      dbUpdateBookmark({
        user_id: userId,
        post_id: postId,
        type: isBookmarked ? "unbookmark" : "bookmark",
      }),
    onMutate: async ({ postId, isBookmarked }) => {
      toggleBookmark(postId, isBookmarked);
    },
    onError: async (error, variables, context) => {
      console.error("Error on bookmarkMutation:", error);
      toggleBookmark(postId, !isBookmarked);
      if (isBookmarked) toast.error(TOAST_MESSAGES.unbookmark.error);
      else toast.error(TOAST_MESSAGES.bookmark.error);
    },
    onSuccess: async (data, { isBookmarked }, context) => {
      if (isBookmarked) toast.success(TOAST_MESSAGES.unbookmark.success);
      else toast.success(TOAST_MESSAGES.bookmark.success);
    },
  });

  const handleBookmark = (postId, isBookmarked) => {
    bookmarkMutation.mutate({ userId, postId, isBookmarked });
  };

  const deleteMutation = useMutation({
    mutationFn: ({ userId, postId }) =>
      dbDeletePost({ user_id: userId, post_id: postId }),
    onMutate: async ({ postId }) => {
      // deletePost(postId);
    },
    onError: async (error, variables, context) => {
      console.error("deletemutatio", error);
      toast.error(TOAST_MESSAGES.delete.error);
    },
    onSuccess: async (data, { postId }, context) => {
      deletePost(postId);
      toast.success(TOAST_MESSAGES.delete.success);
    },
  });

  const handleDelete = (postId, onDeleteSucess) => {
    deleteMutation.mutate(
      { postId, userId },
      {
        onSuccess: () => {
          if (onDeleteSucess) onDeleteSucess();
        },
      }
    );
  };

  const createMutation = useMutation({
    mutationFn: ({ userId, content, images, replyToId, originalId }) =>
      dbCreateNewPost({
        user_id: userId,
        content,
        images,
        reply_to_id: replyToId,
        original_id: originalId,
      }),
    onMutate: async (variables) => {},
    onError: async (error, variables, context) => {
      toast.error(TOAST_MESSAGES.create.error);
    },
    onSuccess: async (data, { userId }, context) => {
      toast.success(TOAST_MESSAGES.create.success);
    },
  });

  const handleCreatePost = (
    { content, images, replyToId, replyToUsername, originalId },
    onCreateSuccess,
    onCreateError
  ) => {
    createMutation.mutate(
      {
        userId,
        content,
        images,
        replyToId,
        originalId,
      },
      {
        onSuccess: async (data, { userId, replyToId }) => {
          console.log("createSuccess ", data, replyToId);
          if (onCreateSuccess) onCreateSuccess();

          try {
            const newPost = await dbFetchPost({ postId: data.postId, userId });
            console.log("CALLING THIS", newPost);
            addPost(newPost);
          } catch (error) {
            console.error(error);
          }
        },
        onError: () => {
          if (onCreateError) onCreateError();
        },
      }
    );
  };

  return {
    handleLike,
    handleRepost,
    handleBookmark,
    handleDelete,
    handleCreatePost,
  };
};
