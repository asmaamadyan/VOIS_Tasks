import React from "react";
import { useSelector } from "react-redux";

function PostsList() {
  const { posts } = useSelector((state) => state.posts);

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.user.uid}>
          <strong>{post.user.email}</strong>: {post.content}
        </li>
      ))}
    </ul>
  );
}
export default PostsList;
