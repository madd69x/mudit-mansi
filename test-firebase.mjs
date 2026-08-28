import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";

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
const storage = getStorage(app);

async function testUpload() {
  console.log("Starting upload test...");
  try {
    const fileRef = ref(storage, `test_file_${Date.now()}.txt`);
    console.log("Uploading to storage...");
    await uploadString(fileRef, 'Hello World');
    
    console.log("Getting URL...");
    const url = await getDownloadURL(fileRef);
    console.log("URL:", url);

    console.log("Writing to Firestore...");
    await addDoc(collection(db, 'photos'), {
      url: url,
      storagePath: fileRef.fullPath,
      createdAt: serverTimestamp()
    });

    console.log("SUCCESS!");
    process.exit(0);
  } catch (error) {
    console.error("FIREBASE ERROR:", error);
    process.exit(1);
  }
}

testUpload();
