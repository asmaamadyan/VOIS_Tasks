import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Post= {
  id: string;
  content: string;
  imageUrl?: string;
  user: {
    uid: string;
    email: string | null;
    displayName: string;
  };
  createdAt: string | null;
}

type PostsState= {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
    },
    addPost(state, action: PayloadAction<Post>) {
      state.posts.unshift(action.payload);
    },
    deletePost(state, action: PayloadAction<string>) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const postsAction = postsSlice.actions;
export default postsSlice.reducer;