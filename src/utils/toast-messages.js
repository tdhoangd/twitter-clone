export const TOAST_MESSAGES = {
  like: {
    success: () => {
      const msgs = [
        "Keep it up! The more posts you like, the better your timeline will be.",
        "Nice work! Your timeline’s getting better. The more you like, the better your timeline will be – keep liking the stuff you’re into.",
      ];

      return msgs[Math.floor(Math.random() * msgs.length)];
    },
    error: "Error liking the post. Please try again.",
  },
  delete: {
    success: "Your post was deleted",
    error: "Error deleting the post. Please try again.",
  },
  create: {
    success: "Your post was sent.",
    error: "Error adding the post. Please try again.",
  },
  bookmark: {
    success: "Added to your Bookmarks",
    error: "Error bookmark the post. Please try again.",
  },
  unbookmark: {
    success: "Removed from your Bookmarks",
    error: "Error unbookmark the post. Please try again.",
  },
  follow: {
    success: (username) => `You followed ${username}`,
    error: (username) => `Error follow the user ${username}. Please try again.`,
  },
  unfollow: {
    success: (username) => `You unfollowed ${username}`,
    error: (username) =>
      `Error unfollow the user ${username}. Please try again.`,
  },
};
