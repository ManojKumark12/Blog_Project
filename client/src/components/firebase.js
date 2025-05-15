// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE,
  authDomain: "blog-aa73b.firebaseapp.com",
  projectId: "blog-aa73b",
  storageBucket: "blog-aa73b.firebasestorage.app", // typo fix: "firebasestorage.app" → "appspot.com"
  messagingSenderId: "458469053521",
  appId: "1:458469053521:web:1446c4e54a813a76e5d470"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
