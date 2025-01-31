// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9YfTO8mJnwMzb-eUCisSTj3i81V8JcyM",
  authDomain: "extension-mind.firebaseapp.com",
  projectId: "extension-mind",
  storageBucket: "extension-mind.firebasestorage.app",
  messagingSenderId: "1080919648170",
  appId: "1:1080919648170:web:34049069cfcc3478cfadd3",
  measurementId: "G-S1X9NH4QRN",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
