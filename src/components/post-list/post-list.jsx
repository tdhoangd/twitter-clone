"use client";

import React from "react";
import { Post } from "@/components/post-list/post/post";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Loading } from "@/components/ui/loading";
import { useInView } from "react-intersection-observer";

export const PostList = ({
  posts,
  error,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
  status,
}) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (!hasNextPage) {
      return;
    }
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (status === "pending") return <Loading />;
  if (status === "error") return <p>Error: {error.message}</p>;

  // const renderedContent = posts.map((post, i) => (
  //   <Post
  //     key={post.key}
  //     post={post}
  //     variant="list"
  //     hasParent={post.hasParent}
  //     hasChildren={post.hasChildren}
  //   />
  // ));

  const renderedContent = posts.map((post, i) => {
    // Check if the post has a parent
    const hasParent = i > 0 && posts[i - 1].id === post.reply_to_id;

    // Check if the post has children
    const hasChildren =
      i < posts.length - 1 && posts[i + 1].reply_to_id === post.id;

    return (
      <Post
        key={post.key}
        post={post}
        variant="list"
        hasParent={hasParent}
        hasChildren={hasChildren}
      />
    );
  });

  return (
    <>
      <AnimatePresence mode="popLayout">{renderedContent}</AnimatePresence>

      {isFetching && !isFetchingNextPage ? (
        <Loading />
      ) : (
        <div className="w-full flex items-center justify-center pt-5">
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {/* LOAD MORE */}
            {isFetchingNextPage ? (
              <Loading />
            ) : hasNextPage ? (
              <Loading />
            ) : (
              <></>
            )}
          </button>
        </div>
      )}
      <div ref={ref} className="h-40 w-full z-[777]"></div>
    </>
  );
};
