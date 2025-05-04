import { getAuth, updateProfile } from "firebase/auth";
import PageContent from "../components/PageContent";
import { useSelector } from "react-redux";

function DashboardPage() {
  const auth = getAuth();
  const user = auth.currentUser;
  const displayName = user.displayName;
  const title = `Welcome ${displayName}`;
  console.log('displayName',displayName);
  
  const { posts } = useSelector((state) => state.posts);
  // const posts = user.posts
  const userPosts = posts.filter((post)=>post.user.uid ==user.uid)
  console.log(userPosts);
  

  return (
    <PageContent title={title}>
      <p>Your Posts</p>
      <ul>
        {userPosts.map((post) => (
          <li key={post.user.uid}>
            <strong>{post.user.email}</strong>: {post.content}
          </li>
        ))}
      </ul>
    </PageContent>
  );
}

export default DashboardPage;
