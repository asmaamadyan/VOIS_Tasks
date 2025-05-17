import { useState } from "react";
import { deletePostById, editPost } from "../firebase/api";
import classes from "./post.module.css";
import PostCard from "./PostCard";

function Post({ posts, currentUserUid }) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  function handleDelete(postId) {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePostById(postId);
      console.log("post deleted", postId);
    }
  }

  const startEdit = (post) => {
    setEditingPostId(post.id);
    setEditedContent(post.content);
    setOpenMenuId(null);
  };

  const handleEditSubmit = async (id) => {
    if (!editedContent.trim()) return;

    const success = await editPost(id, editedContent);
    if (success) {
      setEditingPostId(null);
      setEditedContent("");
    }
  };

  const toggleMenu = (postId) => {
    setOpenMenuId((prevId) => (prevId === postId ? null : postId));
  };

  return (
    <div className={classes.container}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          currentUserUid={currentUserUid}
          onEdit={startEdit}
          onDelete={handleDelete}
          onSave={handleEditSubmit}
          onCancel={() => setEditingPostId(null)}
          isEditing={editingPostId === post.id}
          editedContent={editedContent}
          setEditedContent={setEditedContent}
        />
      ))}
    </div>
  );
}

export default Post;