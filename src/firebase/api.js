import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  Timestamp,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { getAuth } from "firebase/auth";


export const fetchPosts = (setPosts) => {
  const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const posts = snapshot.docs.map(doc => ({
      // id: doc.id,
      ...doc.data()
    }));
    setPosts(posts);
    return posts
  }, (error) => {
    console.error("Firestore fetch error:", error.message);
  });

  return unsubscribe;
};

export const createPost = async (content) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("User not logged in");
    return null;
  }

  try {
    const docRef = await addDoc(collection(db, "posts"), {
      content,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
      },
      createdAt: Timestamp.now(),
    });
    return {
      id: docRef.id,
      content,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
      },
      createdAt: new Date()
    };
  } catch (error) {
    console.error("Error adding post:", error.message);
    return null;
  }
};

export const deletePostById = async (id) => {
  await deleteDoc(doc(db, "posts", id));
};
