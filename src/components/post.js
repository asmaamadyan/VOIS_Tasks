import { useState } from "react";
import { deletePostById, editPost } from "../firebase/api";
import classes from "./post.module.css";
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
        <div className={classes.box} key={post.id}>
          <div className={classes.header}>
            <strong>
              {post.user?.displayName || post.user?.email || "Anonymous"}
            </strong>
            {post.user?.uid === currentUserUid && (
              <div className={classes.menuWrapper}>
                <button
                  className={classes.menuButton}
                  onClick={() => toggleMenu(post.id)}
                >
                  ⋯
                </button>
                {openMenuId === post.id && (
                  <div className={classes.menu}>
                    <button onClick={() => startEdit(post)}>Edit</button>
                    <button onClick={() => handleDelete(post.id)}>Delete</button>
                  </div>
                )}
              </div>
            )}
          </div>

          {editingPostId === post.id ? (
            <div className={classes.editArea}>
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <button onClick={() => handleEditSubmit(post.id)}>Save</button>
              <button onClick={() => setEditingPostId(null)}>Cancel</button>
            </div>
          ) : (
            <div className={classes.content}>{post.content}</div>
          )}

          {post.imageUrl && (
            <img src={post.imageUrl} alt="Post" className={classes.image} />
          )}

          <div className={classes.date}>
            {new Date(post.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Post;
