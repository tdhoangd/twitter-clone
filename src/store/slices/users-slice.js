"use client";

export const usersSlice = (set, get) => ({
  user: null, // current user, owner ...
  following: new Set(),
  followers: new Set(),
  userProfiles: [],

  setUserData: (user, following, followers) =>
    set((state) => {
      return {
        ...state,
        user,
        following: new Set(following),
        followers: new Set(followers),
      };
    }),

  updateUser: (updatedData) =>
    set((state) => {
      const updatedUser = {
        ...state.user,
        ...updatedData,
      };

      const updatedUserProfiles = state.userProfiles.map((tUser) => {
        if (tUser.id === updatedUser.id) {
          return {
            ...tUser,
            ...updatedData,
          };
        } else {
          return tUser;
        }
      });

      return {
        ...state,
        user: updatedUser,
        userProfiles: updatedUserProfiles,
      };
    }),

  addProfileToUserProfiles: (newTargetUserData) =>
    set((state) => {
      if (
        !state.userProfiles.some((user) => user.id === newTargetUserData.id)
      ) {
        return {
          ...state,
          userProfiles: [...state.userProfiles, newTargetUserData],
        };
      }

      return state;
    }),

  toggleFollow: (targetUserId) =>
    set((state) => {
      const updatedFollowing = new Set(state.following);
      const isFollowing = updatedFollowing.has(targetUserId);

      // toggle the following state
      if (isFollowing) {
        updatedFollowing.delete(targetUserId);
      } else {
        updatedFollowing.add(targetUserId);
      }

      // update the user's following count
      const updatedUser = { ...state.user };
      if (updatedUser) {
        updatedUser.following_count = isFollowing
          ? updatedUser.following_count - 1
          : updatedUser.following_count + 1;
      }

      // update the target users' followers count in userProfiles
      const updatedUserProfiles = { ...state.userProfiles };
      if (updatedUserProfiles[targetUserId]) {
        updatedUserProfiles[targetUserId] = {
          ...updatedUserProfiles[targetUserId],
          followers_count: isFollowing
            ? (updatedUserProfiles[targetUserId].followers_count || 1) - 1
            : (updatedUserProfiles[targetUserId].followers_count || 0) + 1,
        };
      }

      return {
        ...state,
        user: updatedUser,
        following: updatedFollowing,
        userProfiles: updatedUserProfiles,
      };
    }),

  checkIsFollowing: (targetUserId) => {
    const state = get();
    return state.following.has(targetUserId);
  },
});
