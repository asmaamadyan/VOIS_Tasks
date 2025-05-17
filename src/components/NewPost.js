import { useState } from "react";
import { Form } from "react-router-dom";
import { createPost } from "../firebase/api";
import { useDispatch, useSelector } from "react-redux";
import { postsAction } from "../store/posts";
import { getAuth } from "firebase/auth";
import classes from "./NewPost.module.css"; 
import Button from "./Button";

function NewPost() {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || !user) return;
    setLoading(true);
    setSuccessMessage("");
    try {
      const newPost = await createPost(content, imageFile);
      console.log(newPost);
      setContent("");
      setImageFile(null);
      if (newPost) {
        dispatch(postsAction.addPost(newPost));
        console.log("posts", posts);
        setSuccessMessage("Post uploaded successfully!");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={classes.formContainer}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        rows={4}
        className={classes.textarea}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
        className={classes.fileInput}
      />
      <Button
        type="submit"
        disabled={loading}
        style={classes.submitButton}
      >
        {loading ? "Posting..." : "Post"}
      </Button>
      {successMessage && (
        <p className={classes.successMessage}>{successMessage}</p>
      )}
    </Form>
  );
}

export default NewPost;