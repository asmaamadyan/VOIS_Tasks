import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import AuthForm from "../components/AuthForm";
import { auth } from "../firebase/firebase";
import { redirect } from "react-router-dom";

function Authentication() {
  return (
    <>
      <AuthForm />
    </>
  );
}

export default Authentication;

export async function action({ params, request }) {
  const searchParams = new URL(request.url).searchParams;
  const data = await request.formData();
  const mode = searchParams.get("mode") || "login";
  if (mode !== "login" && mode !== "signup") {
    throw new Response(JSON.stringify({ message: "Unsupported mode" }), {
      status: 422,
    });
  }
  const authData = {
    firstName: data.get("firstName"),
    lastName: data.get("lastName"),
    email: data.get("email"),
    password: data.get("password"),
  };
  if (mode === "signup") {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        authData.email,
        authData.password
      );
      const user = userCredential.user;
      const userId = user.uid;
      const fullName = `${authData.firstName} ${authData.lastName}`;
      await updateProfile(user, {
        displayName: fullName,
      });

      const token = await user.getIdToken();
      localStorage.setItem("token", token);
      return redirect("/dashboard");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error creating user:", errorCode, errorMessage);
      throw error; // Re-throw the error for handling in your UI
    }
  }

  if (mode === "login") {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        authData.email,
        authData.password
      );
      console.log(response);
      const token = response.user.accessToken;
      localStorage.setItem("token", token);
      const expiration = new Date()
      expiration.setHours(expiration.getHours()+1)
      localStorage.setItem('expiration',expiration.toISOString())
      return redirect("/dashboard");
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        alert('No user found with this email.');
      } else if (error.code === 'auth/wrong-password') {
        alert('Incorrect password.');
      } else {
        alert(error.message);
      }
    }
  }
}
