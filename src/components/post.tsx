import { JSX, useState } from "react";
import { deletePostById, editPost } from "../firebase/api";
import classes from "./post.module.css";

type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
};

type PostType = {
  id: string;
  content: string;
  imageUrl?: string;
  user: User;
  createdAt: string | null; 
};

type PostProps = {
  posts: PostType[];
  currentUserUid: string;
};

function Post({ posts, currentUserUid }: PostProps): JSX.Element {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");

  function handleDelete(postId: string): void {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePostById(postId);
      console.log("Post deleted:", postId);
    }
  }

  const startEdit = (post: PostType): void => {
    setEditingPostId(post.id);
    setEditedContent(post.content);
    setOpenMenuId(null);
  };

  const handleEditSubmit = async (id: string): Promise<void> => {
    if (!editedContent.trim()) return;

    const success = await editPost(id, editedContent);
    if (success) {
      setEditingPostId(null);
      setEditedContent("");
    }
  };

  const toggleMenu = (postId: string): void => {
    setOpenMenuId((prevId) => (prevId === postId ? null : postId));
  };

  return (
    <div className={classes.container}>
      {posts.map((post) => (
        <div className={classes.postCard} key={post.id}>
          <div className={classes.header}>
            <strong className={classes.author}>
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
                className={classes.textarea}
              />
              <div className={classes.editButtons}>
                <button
                  className={classes.saveButton}
                  onClick={() => handleEditSubmit(post.id)}
                >
                  Save
                </button>
                <button
                  className={classes.cancelButton}
                  onClick={() => setEditingPostId(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className={classes.content}>{post.content}</div>
          )}

          {post.imageUrl && (
            <img src={post.imageUrl} alt="Post" className={classes.image} />
          )}

          <div className={classes.date}>
            {post.createdAt
              ? new Date(post.createdAt).toLocaleString()
              : "Unknown date"}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Post;