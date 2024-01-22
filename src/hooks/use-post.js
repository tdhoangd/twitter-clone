"use client";

import { dbFetchPost } from "@/lib/supabase/db";
import { useBoundStore } from "@/store/use-bound-store";
import { useEffect, useId, useState } from "react";

export const usePost = (repostId, postId = null) => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { addPost, userId, posts } = useBoundStore((state) => ({
    getPost: state.getPost,
    addPost: state.addPost,
    userId: state.user.id,
    posts: state.posts,
  }));

  useEffect(() => {
    const fetchAndStorePost = async () => {
      let postKey = postId;
      if (repostId) postKey = repostId;

      let post = posts.find((post) => post.key === postKey) || null;

      if (!post) {
        try {
          post = await dbFetchPost({ postId, repostId, userId });
          if (post) {
            // Add post to store
            addPost(post);
          }
        } catch (error) {
          console.error("Error fetching post:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }

      setPost(post);
    };

    fetchAndStorePost();
  }, [postId, repostId, posts, addPost, userId]);

  return { post, isLoading };
};
