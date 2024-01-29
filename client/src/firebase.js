// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-c6d51.firebaseapp.com",
  projectId: "mern-blog-c6d51",
  storageBucket: "mern-blog-c6d51.appspot.com",
  messagingSenderId: "963432473011",
  appId: "1:963432473011:web:c39f05bb98e886f18eebc6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
