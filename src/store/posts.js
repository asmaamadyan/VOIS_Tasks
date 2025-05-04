import { createSlice } from "@reduxjs/toolkit";
import { Timestamp } from "firebase/firestore";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [
      {
        content: "This is my first post",
        user: { uid: "user1", email: "user@example.com" },
        createdAt: Timestamp.now(),
      },
    ],
    loading: false,
    error: null,
  },
  reducers: {
    setPosts(state, action) {
      state.posts = { ...state, action };
    },
    addPost(state, action) {
      state.posts.unshift(action.payload);
    },
    deletePost(state, action) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const postsAction = postsSlice.actions;
export default postsSlice.reducer;
