import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

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
const db = getFirestore(app);

async function testFirestore() {
  console.log("Testing Firestore write access...");
  try {
    await addDoc(collection(db, 'photos'), {
      url: "https://example.com/test.jpg",
      createdAt: serverTimestamp()
    });
    console.log("SUCCESS! Firestore write worked.");
    process.exit(0);
  } catch (error) {
    console.error("FIREBASE FIRESTORE ERROR:", error);
    process.exit(1);
  }
}

testFirestore();
