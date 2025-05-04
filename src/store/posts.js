// store/posts.js
import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [], // should be an array
    loading: false,
    error: null,
  },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload; // directly set array
    },
    addPost(state, action) {
      state.posts.unshift(action.payload); // works now
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
