import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import AuthForm from "../components/AuthForm";
import { auth } from "../firebase/firebase";

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
  const mode = searchParams("mode") || "login";
  if (mode !== "login" && mode !== "signup") {
    throw new Response(JSON.stringify({ message: "Unsupported mode" }), {
      status: 422,
    });
  }
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };
  if (mode === "signup") {
    try {
      await createUserWithEmailAndPassword(
        auth,
        authData.email,
        authData.password
      );
    } catch (error) {
      console.error(error.message);
    }
  }
  if (mode === "signin") {
    try {
      await signInWithEmailAndPassword(auth, authData.email, authData.password);
      
    } catch (error) {
      console.error(error.message);
    }
  }
}
