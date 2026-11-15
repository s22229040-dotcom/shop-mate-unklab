import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDnQS_oburIlNQgQ9dswwJK0EzCEZYF8LU",
  authDomain: "fir-1befe.firebaseapp.com",
  projectId: "fir-1befe",
  storageBucket: "fir-1befe.firebasestorage.app",
  messagingSenderId: "543605091322",
  appId: "1:543605091322:web:6ef1b2595907404267d243",
  measurementId: "G-N5VTLXPT7S"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);