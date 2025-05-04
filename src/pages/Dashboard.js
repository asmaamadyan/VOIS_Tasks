import { getAuth } from "firebase/auth";
import PageContent from "../components/PageContent";
import { useSelector } from "react-redux";
import Post from "../components/post";

function DashboardPage() {
  const auth = getAuth();
  const user = auth.currentUser;
  const displayName = localStorage.getItem("userName");
  const title = `Welcome ${displayName}`;

  const posts = useSelector((state) => state.posts.posts || []);
  console.log('dapos',posts);
  

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
