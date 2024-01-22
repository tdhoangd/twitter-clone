export const EMPTY_MESSAGES = {
  likes: {
    owner: {
      title: "You don't have any likes yet",
      description:
        "Tap the heart on any post to show it some love.\n When you do, it'll show up here.",
    },
    other: {
      title: (username) => `@${username} hasn't liked any posts`,
      description: "When they do, those posts will show up here.",
    },
  },
  media: {
    owner: {
      title: "Lights, camera…\n attachments!",
      description: "When you post photos or videos, they will show up here.",
    },
    other: {
      title: (username) => `@${username}\n hasn’t posted media`,
      description: "Once they do, those posts will show up here.",
    },
  },
  posts: {
    owner: {
      title: "You don't have any posts yet",
      description: "When you postß, they will show up here.",
    },
    other: {
      title: (username) => `@${username}\n hasn’t posted`,
      description: "Once they do, those posts will show up here.",
    },
  },

  replies: {
    owner: {
      title: "You don't have any replies yet",
      description: "When you reply, they will show up here.",
    },
    other: {
      title: (username) => `@${username}\n hasn’t replied`,
      description: "Once they do, those replies will show up here.",
    },
  },
};
