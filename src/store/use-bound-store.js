import { postsSlice } from "./slices/posts-slice";
import { usersSlice } from "./slices/users-slice";
import { create } from "zustand";

export const useBoundStore = create((set, get) => ({
  ...usersSlice(set, get),
  ...postsSlice(set, get),
}));
