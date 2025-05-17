import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import postsReducer from "./posts";

const store = configureStore({
  reducer: { auth: authReducer, posts: postsReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;