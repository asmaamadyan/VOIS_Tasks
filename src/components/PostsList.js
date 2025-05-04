import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../firebase/api";
import { postsAction } from "../store/posts"; 
import Post from "./post";

function PostsList() {
  // const [posts, setPosts] = useState([]);
  const{posts,setPosts}=useSelector(state=>state.posts)
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
  }, [dispatch]);

  return (
   <Post posts={posts} />
  );
}

export default PostsList;
