import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, ref, uploadBytes, getDownloadURL };
