import { useState } from "react";
import { Form } from "react-router-dom";
import { createPost } from "../firebase/api";
import { useDispatch, useSelector } from "react-redux";
import { postsAction } from "../store/posts";
import { getAuth } from "firebase/auth";

function NewPost() {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = auth.currentUser;
  const{posts}=useSelector(state=>state.posts)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || !user) return;

    const newPost = await createPost(content,user); 
    console.log(newPost);

    if (newPost) {
      dispatch(postsAction.addPost(newPost)); 
      console.log('posts',posts);
      
    }

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

export default NewPost;
