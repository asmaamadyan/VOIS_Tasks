import React, { ChangeEvent, FormEvent, useState } from "react";
import { Form } from "react-router-dom";
import { createPost } from "../firebase/api";
import { useDispatch, useSelector } from "react-redux";
import { postsAction } from "../store/posts";
import { getAuth, User } from "firebase/auth";
import classes from "./NewPost.module.css"; 
import { RootState } from "../store";


const NewPost : React.FC=()=> {
  const [content, setContent] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const { posts } = useSelector((state : RootState) => state.posts);
  const dispatch = useDispatch();
  const auth = getAuth();
  const user : User|null = auth.currentUser;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!content.trim() || !user) return;
    setLoading(true);
    setSuccessMessage("");
    try {
      const newPost = await createPost(content, imageFile||undefined);
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
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
        onChange={handleFileChange}
        className={classes.fileInput}
      />
      <button
        type="submit"
        disabled={loading}
        className={classes.submitButton}
      >
        {loading ? "Posting..." : "Post"}
      </button>
      {successMessage && (
        <p className={classes.successMessage}>{successMessage}</p>
      )}
    </Form>
  );
}

export default NewPost;