import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const postsRef = collection(db, "posts");

export const fetchAllPosts = async () => {
  const q = query(postsRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addPost = async (userId, content) => {
  try {
    await addDoc(collection(db, "posts"), {
      userId,
      content,
      createdAt: Timestamp.now(),
    });
    console.log("post added");
  } catch (err) {
    console.error("Error adding post:", err.message);
  }
};

export const deletePostById = async (id) => {
  await deleteDoc(doc(db, "posts", id));
};
