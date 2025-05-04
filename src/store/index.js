import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth';
import postsReducer from'./posts'

const store = configureStore({
    reducer : { auth : authReducer, posts :postsReducer }
})
export default store;