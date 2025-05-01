// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEILKiCsQRlL9IF4ZxmG4HUCoxFHUvfOE",
  authDomain: "dashboard-project-fcfee.firebaseapp.com",
  projectId: "dashboard-project-fcfee",
  storageBucket: "dashboard-project-fcfee.firebasestorage.app",
  messagingSenderId: "74931582712",
  appId: "1:74931582712:web:a358971d2a490b81ebed0d",
  measurementId: "G-5Q6R61LRVJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
