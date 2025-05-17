import classes from "./post.module.css";
import Button from "./Button";
function PostCard({
    post,
    currentUserUid,
    onEdit,
    onDelete,
    onSave,
    onCancel,
    isEditing,
    editedContent,
    setEditedContent,
  }) {
    return (
      <div className={classes.postCard}>
        <div className={classes.header}>
          <strong className={classes.author}>
            {post.user?.displayName || post.user?.email || "Anonymous"}
          </strong>
          {post.user?.uid === currentUserUid && (
            <div className={classes.menuWrapper}>
              <Button
                style={classes.menuButton}
                onClick={() => onEdit(post)}
              >
                ⋯
              </Button>
              {isEditing && (
                <div className={classes.menu}>
                  <Button onClick={() => onEdit(post)}>Edit</Button>
                  <Button onClick={() => onDelete(post.id)}>Delete</Button>
                </div>
              )}
            </div>
          )}
        </div>
  
        {isEditing ? (
          <div className={classes.editArea}>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className={classes.textarea}
            />
            <div className={classes.editButtons}>
              <Button
                style={classes.saveButton}
                onClick={() => onSave(post.id)}
              >
                Save
              </Button>
              <Button
                style={classes.cancelButton}
                onClick={onCancel}
              >
                Cancel
              </Button>
            </div>
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
    );
  }
export default PostCard;{}