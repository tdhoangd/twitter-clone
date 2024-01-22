"use client";

export const postsSlice = (set, get) => ({
  timeAnchor: new Date().toISOString(),
  post: null,

  posts: [],
  pageData: {
    foryou: { postKeys: [], pageParam: 0 },
    following: { postKeys: [], pageParam: 0 },
  },

  currentPageKey: "foryou",

  setCurrentPageKey: (keyString) =>
    set((state) => {
      return {
        ...state,
        currentPageKey: keyString,
      };
    }),

  addPost: (
    newPost // new post or reply
  ) =>
    set((state) => {
      let updatedPosts = [newPost, ...state.posts];
      if (state.posts.some((post) => post.key === newPost.key)) {
        return {
          ...state,
          posts: updatedPosts,
        };
      }

      if (newPost.reply_to_id) {
        updatedPosts = updatedPosts.map((post) => {
          if (newPost.reply_to_id === post.id) {
            return {
              ...post,
              reply_count: (post.reply_count || 0) + 1,
            };
          }
          return post;
        });
      }

      // Ensure postKeys are initialized as arrays
      const updatedPageData = {
        ...state.pageData,
        foryou: {
          ...state.pageData.foryou,
          postKeys: [newPost.key, ...(state.pageData.foryou.postKeys || [])],
        },
        following: {
          ...state.pageData.following,
          postKeys: [newPost.key, ...(state.pageData.following.postKeys || [])],
        },
      };

      if (
        (state.currentPageKey !== "foryou" &&
          state.currentPageKey !== "following" &&
          state.currentPageKey.startsWith("owner")) ||
        state.currentPageKey === `reply_${newPost.reply_to_id}`
      ) {
        updatedPageData[state.currentPageKey] = {
          ...updatedPageData[state.currentPageKey],
          postKeys: [
            newPost.key,
            ...(updatedPageData[state.currentPageKey]?.postKeys || []),
          ],
        };
      }

      return {
        ...state,
        posts: updatedPosts,
        pageData: updatedPageData,
      };
    }),

  addRepostPost: (key, postId) =>
    set((state) => {
      const originalPost = state.posts.find((post) => post.id === postId);
      if (!originalPost) return { ...state };

      const newPost = {
        ...originalPost,
        key,
        reposter: {
          id: state.user.id,
          name: state.user.name,
          username: state.user.username,
          avatar_image_path: state.user.avatar_image_path,
        },
      };

      const updatedPosts = [newPost, ...state.posts];

      const updatedPageData = {
        ...state.pageData,
        foryou: {
          ...state.pageData.foryou,
          postKeys: [key, ...state.pageData.foryou.postKeys],
        },
        following: {
          ...state.pageData.following,
          postKeys: [key, ...state.pageData.following.postKeys],
        },
      };

      return {
        ...state,
        posts: updatedPosts,
        pageData: updatedPageData,
      };
    }),

  addPosts: (newPosts) => {
    set((state) => {
      const exisitingPostKeys = new Set(state.posts.map((post) => post.key));

      const uniquePosts = newPosts.filter(
        (newPost) => !exisitingPostKeys.has(newPost.key)
      );

      return { ...state, posts: [...state.posts, ...uniquePosts] };
    });
  },

  addPostsToPage: (pageKey, newPostKeys, newPageParam, existingPostKeys) => {
    set((state) => {
      const existingPostKeys = new Set(state.pageData[pageKey]?.postKeys || []);

      newPostKeys.forEach((keys) => {
        const [key, replyToId, originalId] = keys;

        if (existingPostKeys) {
          // Add originalId if it exists and is not already in the set
          if (originalId) {
            existingPostKeys.add(originalId);
          }

          // Add replyToId if it exists and is not already in the set
          if (replyToId) {
            existingPostKeys.add(replyToId);
          }
        }

        // Add key if it's not already in the set
        if (!existingPostKeys.has(key)) {
          existingPostKeys.add(key);
        }
      });

      // Convert the set back to an array for the updated post keys
      const updatedPostKeys = Array.from(existingPostKeys);

      return {
        ...state,
        pageData: {
          ...state.pageData,
          [pageKey]: {
            postKeys: updatedPostKeys,
            pageParam: newPageParam,
          },
        },
      };
    });
  },

  deletePost: (postId) =>
    set((state) => {
      let removedPostKeys = [];
      let replyToIdUpdate = null;

      let updatedPosts = state.posts.filter((post) => {
        if (post.id === postId) {
          if (post.reply_to_id) {
            replyToIdUpdate = post.reply_to_id;
          }
          removedPostKeys.push(post.key);
          return false;
        }
        return true;
      });

      if (replyToIdUpdate !== null) {
        updatedPosts = updatedPosts.map((post) => {
          if (post.id === replyToIdUpdate) {
            return {
              ...post,
              reply_count: Math.max(0, post.reply_count - 1),
            };
          }
          return post;
        });
      }

      // Remove the keys from all pages' postKeys arrays
      const updatedPageData = Object.keys(state.pageData).reduce(
        (acc, pageKey) => {
          const filteredPostKeys = state.pageData[pageKey].postKeys.filter(
            (key) => !removedPostKeys.includes(key)
          );
          acc[pageKey] = {
            ...state.pageData[pageKey],
            postKeys: filteredPostKeys,
          };
          return acc;
        },
        {}
      );

      return {
        ...state,
        posts: updatedPosts,
        pageData: updatedPageData,
      };
    }),

  toggleLike: (postId) =>
    set((state) => {
      const updatedPosts = state.posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            is_liked: !post.is_liked,
            like_count: post.is_liked
              ? Math.max(0, post.like_count - 1)
              : post.like_count + 1,
          };
        }
        return post;
      });

      return {
        ...state,
        posts: updatedPosts,
      };
    }),

  toggleRepost: (postId) =>
    set((state) => {
      let repostRemoved = false;
      let removedPostKey = null;

      const updatedPosts = state.posts.reduce((acc, post) => {
        if (post.id === postId) {
          const isCurrentlyReposted = post.is_reposted;

          if (isCurrentlyReposted && post.reposter?.id === state.user.id) {
            // Remove repost if it belongs to the user
            repostRemoved = true;
            removedPostKey = post.key;
            return acc; // Do not include this post in the updated list
          } else {
            // Toggle repost status for other posts
            return [
              ...acc,
              {
                ...post,
                is_reposted: !isCurrentlyReposted,
                repost_count: isCurrentlyReposted
                  ? Math.max(0, post.repost_count - 1)
                  : post.repost_count + 1,
              },
            ];
          }
        }
        return [...acc, post];
      }, []);

      // Remove the key from foryou and following if a repost was removed
      if (repostRemoved && removedPostKey) {
        ["foryou", "following"].forEach((key) => {
          state.pageData[key].postKeys = state.pageData[key].postKeys.filter(
            (key) => key !== removedPostKey
          );
        });
      }

      return { ...state, posts: updatedPosts };
    }),

  toggleBookmark: (postId) =>
    set((state) => {
      const pageKey = "owner_bookmarks";
      let is_bookmarked = false;
      let postsWithSamePostId = [];
      let updatedPosts = state.posts.map((post) => {
        if (post.id === postId) {
          is_bookmarked = post.is_bookmarked;

          const updatedPost = {
            ...post,
            is_bookmarked: !post.is_bookmarked,
          };

          postsWithSamePostId.push(updatedPost);

          return updatedPost;
        }
        return post;
      });

      let updatedBookmarksPostKeys = state.pageData[pageKey]?.postKeys || [];

      if (is_bookmarked) {
        const keysToRemove = new Set(
          postsWithSamePostId.map((post) => post.key)
        );
        updatedBookmarksPostKeys = updatedBookmarksPostKeys.filter(
          (key) => !keysToRemove.has(key)
        );
      } else {
        let actualPost = postsWithSamePostId.find(
          (post) => post.key === postId
        );
        if (!actualPost && postsWithSamePostId.length > 0) {
          const { reposter, ...rest } = postsWithSamePostId[0];
          actualPost = { ...rest, key: postId };

          updatedPosts = [actualPost, ...updatedPosts]; //[...updatedPosts, actualPost]; // add actualpost to updatePosts
        }

        updatedBookmarksPostKeys = [postId, ...updatedBookmarksPostKeys];
      }

      return {
        ...state,
        posts: updatedPosts,
        pageData: {
          ...state.pageData,
          [pageKey]: {
            ...state.pageData[pageKey],
            postKeys: updatedBookmarksPostKeys,
          },
        },
      };
    }),
});
