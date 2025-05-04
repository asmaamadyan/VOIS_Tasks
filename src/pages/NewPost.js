import { useDispatch, useSelector } from "react-redux";
import { postsAction } from "../store/posts";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { Form } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
function NewPostPage() {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newPost = {
      content: content,
      user: { uid: user.uid, email: user.email },
      createdAt: Timestamp.now(),
    };

    dispatch(postsAction.addPost(newPost));
    setContent("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
      />
      <button type="submit">Post</button>
    </Form>
  );
}
export default NewPostPage;
