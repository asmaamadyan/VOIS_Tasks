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
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { getAuth } from "firebase/auth";

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
        createdAt: createdAt|| null, 
      };
    });

    callback(posts);
  });

  return unsubscribe;
};

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
export const editPost =async(postId,updatedContent)=>{
  try{
    const postRef=doc(db,'posts',postId);
    await updateDoc(postRef ,{
      content : updatedContent
    });
    return true;
  }catch(error){
    console.error("Error editing post:", error.message);
    return false;
  }
}