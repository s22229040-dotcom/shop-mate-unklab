// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnQS_oburIlNQGq9DswwJK0EzCEZYF8LU",
  authDomain: "fir-1befe.firebaseapp.com",
  projectId: "fir-1befe",
  storageBucket: "fir-1befe.firebasestorage.app",
  messagingSenderId: "543605091322",
  appId: "1:543605091322:web:6ef1b2595907404267d243",
  measurementId: "G-N5VTLXPT7S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);