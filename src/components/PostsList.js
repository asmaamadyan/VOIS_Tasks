import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../firebase/api";
import { postsAction } from "../store/posts"; 
import Post from "./post";

function PostsList() {
  const{posts}=useSelector(state=>state.posts)
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = fetchPosts((fetchedPosts) => {
      postsAction.setPosts(fetchedPosts);
      dispatch(postsAction.setPosts(fetchedPosts));
      console.log('posts',posts);
      
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [dispatch,fetchPosts]);

  return (
   <Post posts={posts} />
  );
}

export default PostsList;
