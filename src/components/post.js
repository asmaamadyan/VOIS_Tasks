import classes from "./post.module.css";
function Post({ posts }) {
  return (
    <div className={classes.container}>
      {posts.map((post) => (
        <div className={classes.box} key={post.id}>
          <div className={classes.header}>
            <strong>
              {post.user?.displayName || post.user?.email || "Anonymous"}
            </strong>
          </div>
          <div className={classes.content}>{post.content}</div>
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt="Post"
           className={classes.image}
            />
          )}
          <div className={classes.date}>
            {post.createdAt || ""}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Post;
