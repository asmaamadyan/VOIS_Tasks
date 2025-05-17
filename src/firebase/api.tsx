import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  Timestamp,
  onSnapshot,
  updateDoc,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { getAuth, User } from "firebase/auth";

// Define types for posts and callbacks
interface Post {
  id: string;
  content: string;
  imageUrl?: string;
  user: {
    uid: string;
    email: string | null;
    displayName: string;
  };
  createdAt: string | null;
}

type FetchPostsCallback = (posts: Post[]) => void;

export const fetchPosts = (callback: FetchPostsCallback): () => void => {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

  const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
    const posts: Post[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      const createdAt = data.createdAt
        ? new Date(data.createdAt.toDate().getTime()).toLocaleString()
        : null;

      console.log("created at", createdAt);

      return {
        id: doc.id,
        ...data,
        createdAt,
      } as Post;
    });

    callback(posts);
  });

  return unsubscribe;
};

export const createPost = async (
  content: string,
  imageFile?: File
): Promise<Post | null> => {
  const auth = getAuth();
  const user: User | null = auth.currentUser;

  if (!user) {
    console.error("User not logged in");
    return null;
  }

  let imageUrl = "";

  try {
    const createdAt = Timestamp.now();
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "authenticated-blog-dashboard"); // Replace with your Cloudinary unsigned preset
      formData.append("folder", "posts"); // Optional: Specify a folder in Cloudinary

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dh5f5sp1y/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image to Cloudinary");
      }
      const data = await response.json();
      imageUrl = data.secure_url;
    }

    const newPost = {
      content,
      imageUrl,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
      },
      createdAt: createdAt,
    };

    const docRef = await addDoc(collection(db, "posts"), newPost);

    return {
      id: docRef.id,
      ...newPost,
      createdAt: createdAt.toDate().toISOString(),
    } as Post;
  } catch (error: any) {
    console.error("Error creating post:", error.message);
    return null;
  }
};

export const deletePostById = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, "posts", id));
};

export const editPost = async (
  postId: string,
  updatedContent: string
): Promise<boolean> => {
  try {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      content: updatedContent,
    });
    return true;
  } catch (error: any) {
    console.error("Error editing post:", error.message);
    return false;
  }
};