import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../firebase/api";
import { postsAction } from "../store/posts"; 
import Post from "./post";
import { getAuth, User } from "firebase/auth";
import { RootState } from "../store";


type PostType={
  id : string;
  content : string;
  imageUrl?:string;
  user:{
    uid: string ;
    email: string | null;
    displayName: string;
  };
  createdAt: string | null;
}
const PostsList: React.FC = () => {
  const{posts}=useSelector((state:RootState)=>state.posts)
  const dispatch = useDispatch();
  const auth=getAuth();
  const user :User|null = auth.currentUser
  const currentUserUid = user?.uid||''

  const [currentPage,setCurrentPage]=useState<number>(1)
  const postsPerPage =5;

  useEffect(() => {
    const unsubscribe = fetchPosts((fetchedPosts: PostType[]) => {
      dispatch(postsAction.setPosts(fetchedPosts));
      console.log("posts", posts);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [dispatch]);
  const indexOfLastPost = currentPage*postsPerPage;
  const indexOfFirstPost = indexOfLastPost-postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost,indexOfLastPost);
  function handlePageChange(pageNumber :number) :void{
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
        <button  key={number}
        onClick={() => handlePageChange(number)}
        className={`page-button ${currentPage === number ? "active" : ""}`}
      >{number}</button>
      ))}</div>
    </div>
  );
}

export default PostsList;
