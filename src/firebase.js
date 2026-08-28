import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyANzCHxgsfV4R-KySDg44Nva0g3wTNEBlg",
  authDomain: "mansi-330f5.firebaseapp.com",
  projectId: "mansi-330f5",
  storageBucket: "mansi-330f5.firebasestorage.app",
  messagingSenderId: "792638837135",
  appId: "1:792638837135:web:3c6a3ffb710ee1d50dbbfa",
  measurementId: "G-C96ER6KQZB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
