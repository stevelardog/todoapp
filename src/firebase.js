// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "process.env.NEXT_PUBLIC_FIREBASE_KEY",
  authDomain: "todolist-b1820.firebaseapp.com",
  projectId: "todolist-b1820",
  storageBucket: "todolist-b1820.appspot.com",
  messagingSenderId: "14774768682",
  appId: "1:14774768682:web:d6afda2bcee1bdd9cbdf53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)