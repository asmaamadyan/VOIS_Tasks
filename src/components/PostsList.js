import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../firebase/api";
import { postsAction } from "../store/posts"; 
import Post from "./post";
import { getAuth } from "firebase/auth";
import Button from "./Button";

function PostsList() {
  const{posts}=useSelector(state=>state.posts)
  const dispatch = useDispatch();
  const auth=getAuth();
  const user = auth.currentUser
  const currentUserUid = user?.uid

  const [currentPage,setCurrentPage]=useState(1)
  const postsPerPage =5;

  useEffect(() => {
    const unsubscribe = fetchPosts((fetchedPosts) => {
      postsAction.setPosts(fetchedPosts);
      dispatch(postsAction.setPosts(fetchedPosts));
      console.log('posts',posts);
      
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [dispatch,posts]);
  const indexOfLastPost = currentPage*postsPerPage;
  const indexOfFirstPost = indexOfLastPost-postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost,indexOfLastPost);
  function handlePageChange(pageNumber){
    setCurrentPage(pageNumber)
  }
  const totalPages= Math.ceil(posts.length/postsPerPage);
  const pageNumbers = Array.from({length:totalPages},(_,i)=>i+1);

  return (
    <div>
      <div className="posts-grid">
      <Post posts={currentPosts} currentUserUid={currentUserUid}/>

      </div>
      <div className="pagination">{
      pageNumbers.map((number)=>(
        <Button  key={number}
        onClick={() => handlePageChange(number)}
        style={`page-button ${currentPage === number ? "active" : ""}`}
      >{number}</Button>
      ))}</div>
    </div>
  );
}

export default PostsList;
