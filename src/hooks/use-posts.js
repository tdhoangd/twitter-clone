"use client";

import { useBoundStore } from "@/store/use-bound-store";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const usePosts = (
  fetchFn,
  pageKey,
  additionalParams,
  existingPostKeys = true
) => {
  const {
    addPosts,
    addPostsToPage,
    posts,
    userId,
    timeAnchor,
    setCurrentPageKey,
  } = useBoundStore((state) => ({
    addPosts: state.addPosts,
    addPostsToPage: state.addPostsToPage,
    posts: state.posts,
    userId: state.user.id,
    timeAnchor: state.timeAnchor,
    setCurrentPageKey: state.setCurrentPageKey,
  }));

  const pageData = useBoundStore(
    (state) => state.pageData[pageKey] || { postIds: [], pageParam: 0 }
  );

  useEffect(() => {
    setCurrentPageKey(pageKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [
      pageKey,
      {
        timeAnchor,
        userId,
        pageSize: 10,
        ...additionalParams,
      },
    ],
    queryFn: fetchFn,
    staleTime: Infinity,
    initialPageParam: pageData?.pageParam || 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length < 10) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  useEffect(() => {
    if (data && !isFetching) {
      const lastPageData = data.pages[data.pages.length - 1];

      addPosts(lastPageData);

      const postKeys = lastPageData.map((post) => {
        return [post.key, post.reply_to_id, post.original_id];
      });

      addPostsToPage(
        pageKey,
        postKeys, //lastPageData.map((post) => post.key),
        data.pages.length,
        existingPostKeys
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const [pagePosts, setPagePosts] = useState([]);

  useEffect(() => {
    // const pagePostKeys = new Set(pageData.postKeys);
    // const updatedPagePosts = posts.filter((post) => pagePostKeys.has(post.key));
    const postsMap = new Map(posts.map((post) => [post.key, post]));

    const updatedPagePosts = (pageData.postKeys || [])
      .map((key) => postsMap.get(key))
      .filter((post) => post !== undefined); // Filter out any undefined entries (in case a key doesn't have a corresponding post)

    setPagePosts(updatedPagePosts);
  }, [posts, pageData.postKeys]); // Ensure dependencies are correct

  return {
    posts: pagePosts,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  };
};
