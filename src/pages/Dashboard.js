import { getAuth } from "firebase/auth";
import PageContent from "../components/PageContent";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/post";
import { useEffect } from "react";
import { fetchPosts } from "../firebase/api";
import { postsAction } from "../store/posts";

function DashboardPage() {
  const auth = getAuth();
  const user = auth.currentUser;
  const displayName = user?.displayName;
  const title = `Welcome ${displayName}`;
  const dispatch = useDispatch()

  const posts = useSelector((state) => state.posts.posts || []);
  console.log('dapos',posts);
  
  useEffect(() => {
    fetchPosts((fetchedPosts) => {
      dispatch(postsAction.setPosts(fetchedPosts));
    });
  }, [dispatch]);
  const userPosts = posts.filter(
    (post) => post.user?.uid === user.uid
  );

  return (
    <PageContent title={title}>
      <p>Your Posts</p>
      {userPosts.length > 0 ? (
        <Post posts={userPosts} />
      ) : (
        <p>You have not posted anything yet.</p>
      )}
    </PageContent>
  );
}

export default DashboardPage;
