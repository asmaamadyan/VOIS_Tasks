import { getAuth } from "firebase/auth";
import PageContent from "../components/PageContent";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/post";
import { useEffect } from "react";
import { fetchPosts } from "../firebase/api";
import { postsAction } from "../store/posts";
import placeholderAvatar from "../assets/placeholder-avatar.png"; // Import the placeholder avatar
import "./Dashboard.css"; // Import the CSS file for styling

function DashboardPage() {
  const auth = getAuth();
  const user = auth.currentUser;
  const displayName = user?.displayName || "User";
  const title = `Welcome ${displayName}`;
  const email = user?.email || ''
  const dispatch = useDispatch();
  console.log('email',email);
  

  const posts = useSelector((state) => state.posts.posts || []);
  console.log("dapos", posts);

  useEffect(() => {
    fetchPosts((fetchedPosts) => {
      dispatch(postsAction.setPosts(fetchedPosts));
    });
  }, [dispatch]);
  const userPosts = posts.filter((post) => post.user?.uid === user.uid);

  return (
    <PageContent title={title}>
      <section className="dashboard-content">
        <div className="user-info">
          <img
            src={user?.photoURL || placeholderAvatar}
            alt="User Avatar"
            className="user-avatar"
          />
          <div className="user-details">
            <p className="user-name">{displayName}</p>
            <p className="user-email">{email || "Email not available"}</p> {/* Ensure email is displayed */}
          </div>
        </div>
        <div className="posts-section">
          <h2 style={{ textAlign: "center" }}>Your Posts</h2>
          {userPosts.length > 0 ? (
            <div className="posts-grid">
              <Post posts={userPosts} currentUserUid={user.uid} />
            </div>
          ) : (
            <div className="empty-state">
              <p>You have not posted anything yet.</p>
              <span>Start sharing your thoughts with the world!</span>
            </div>
          )}
        </div>
      </section>
    </PageContent>
  );
}

export default DashboardPage;