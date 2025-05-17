import { getAuth, User } from "firebase/auth";
import PageContent from "../components/PageContent";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/post";
import { JSX, useEffect } from "react";
import { fetchPosts } from "../firebase/api";
import { postsAction } from "../store/posts";
import placeholderAvatar from "../assets/placeholder-avatar.png"; // Import the placeholder avatar
import "./Dashboard.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";

import { RootState } from "../store";
import { FaPen as FaPenIcon } from 'react-icons/fa';
const FaPen = FaPenIcon as unknown as React.FC;

function DashboardPage(): JSX.Element {
  const auth = getAuth();
  const user: User | null = auth.currentUser;
  const displayName = user?.displayName || "User";
  const title = `Welcome ${displayName}`;
  const email = user?.email || "";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = useSelector((state: RootState) => state.posts.posts || []);

  useEffect(() => {
    fetchPosts((fetchedPosts) => {
      dispatch(postsAction.setPosts(fetchedPosts));
    });
  }, [dispatch]);
  const userPosts = posts.filter((post) => post.user?.uid === user?.uid);
  function handleAddPost() {
    navigate("/newpost");
  }

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
            <p className="user-email">{email || "Email not available"}</p>
          </div>
        </div>
        <div className="posts-section">
          <h2 style={{ textAlign: "center" }}>Your Posts</h2>
          <button className="add-post-button" onClick={handleAddPost}>
            <span className="write-icon">
              <FaPen/>
            </span>
          </button>
          {userPosts.length > 0 ? (
            <div className="posts-grid">
              <Post posts={userPosts} currentUserUid={user?.uid || ""} />
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
