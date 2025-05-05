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
import { db, storage } from "../firebase/firebase";
import { getAuth } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const fetchPosts = (callback) => {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const posts = snapshot.docs.map((doc) => {
      const data = doc.data();
      const createdAt=new Date(data.createdAt?.toDate().getTime()).toLocaleString()
      console.log('created at',createdAt);
      
      return {
        id: doc.id,
        ...data,
        createdAt: createdAt|| null, // convert to number (timestamp in ms)
      };
    });

    callback(posts);
  });

  return unsubscribe;
};

// export const createPost = async (content, user, imageFile = null) => {
//   if (!user) {
//     console.error("User not logged in");
//     return null;
//   }

//   let imageUrl = "";

//   try {
//     // Upload image if provided
//     if (imageFile && imageFile.name) {
//       const imagePath = `posts/${user.uid}/${Date.now()}_${imageFile.name}`;
//       const imageRef = ref(storage, imagePath);
//       const snapshot = await uploadBytes(imageRef, imageFile);
//       imageUrl = await getDownloadURL(snapshot.ref);
//       console.log("Image uploaded, URL:", imageUrl); //
//       console.log("Selected file:", imageFile); // should show name, size, type

//     }

//     // Save post to Firestore
//     const docRef = await addDoc(collection(db, "posts"), {
//       content,
//       imageUrl,
//       user: {
//         uid: user.uid,
//         email: user.email,
//         displayName: user.displayName || "",
//       },
//       createdAt: Timestamp.now(),
//     });

//     return {
//       id: docRef.id,
//       content,
//       imageUrl,
//       user: {
//         uid: user.uid,
//         email: user.email,
//         displayName: user.displayName || "",
//       },
//       createdAt: new Date(),
//     };
//   } catch (error) {
//     console.error("Error creating post:", error.message);
//     return null;
//   }
// };
export const createPost = async (content, imageFile) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("User not logged in");
    return null;
  }

  let imageUrl = "";

  try {
    const createdAt = Timestamp.now();
    if (imageFile) {
      const storageRef = ref(
        storage,
        `posts/${user.uid}/${Date.now()}_${imageFile.name}`
      );
      const snapshot = await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
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
      createdAt: createdAt.toDate().getTime(),
    };
  } catch (error) {
    console.error("Error creating post:", error.message);
    return null;
  }
};
export const deletePostById = async (id) => {
  await deleteDoc(doc(db, "posts", id));
};
