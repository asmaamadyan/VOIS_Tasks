import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../firebase/api";

function PostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = fetchPosts(setPosts);
    console.log(posts);
    
    
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <strong>{post.user?.email || 'Anonymous'}</strong>: {post.content}
        </li>
      ))}
    </ul>
  );
}

export default PostsList;
