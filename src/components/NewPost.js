import { useState } from "react";
import { Form } from "react-router-dom";
import { createPost } from "../firebase/api";
import { useDispatch, useSelector } from "react-redux";
import { postsAction } from "../store/posts";
import { getAuth } from "firebase/auth";

function NewPost() {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || !user) return;
    setLoading(true);
    try {
      const newPost = await createPost(content, imageFile);
      console.log(newPost);
      setContent("");
      setImageFile(null);
      if (newPost) {
        dispatch(postsAction.addPost(newPost));
        console.log("posts", posts);
        setContent("");
        setImageFile(null);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        rows={4}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          color: "#2a2633",
          backgroundColor: "#d2b5e2",
        }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
        style={{ marginBottom: "10px" }}
      />
      <button
        type="submit"
        disabled={loading}
        style={{
          marginRight: "5px",
          backgroundColor: "#a872bd",
          color: "#2a2633",
          paddingInline: '10px',
        }}
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </Form>
  );
}

export default NewPost;
