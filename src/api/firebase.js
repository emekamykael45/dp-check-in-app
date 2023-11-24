// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnaf8U7r8exlDY7GRbHuP59ihdbMyLCgY",
  authDomain: "dp-check-in-app.firebaseapp.com",
  projectId: "dp-check-in-app",
  storageBucket: "dp-check-in-app.appspot.com",
  messagingSenderId: "444435151541",
  appId: "1:444435151541:web:ac25c0988792b461c39cfc",
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
