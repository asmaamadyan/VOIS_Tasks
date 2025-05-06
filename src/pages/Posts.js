import React from "react";
import "./Dashboard.css"; // Import the CSS file for styling

import PostsList from "../components/PostsList";
function PostsPage() {
  return (
    <section className="dashboard-content">
      <h2
        style={{
          textAlign: "center",
          fontSize: "1.8rem",
          color: "#6a4c93",
          marginBottom: "1rem",
        }}
      >
        All Posts
      </h2>
      <PostsList />;
    </section>
  );
}
export default PostsPage;
