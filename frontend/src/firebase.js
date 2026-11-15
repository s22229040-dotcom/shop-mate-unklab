// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDnQS_oburIlNQgQ9dswwJK0EzCEZYF8LU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "fir-1befe.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "fir-1befe",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "fir-1befe.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "543605091322",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:543605091322:web:6ef1b2595907404267d243",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-N5VTLXPT7S"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);