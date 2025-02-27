// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ✅ Import Storage

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOmGbEzPlCtlac6zgTydprhY1afz6bHlU",
  authDomain: "secondhandcar-f0b47.firebaseapp.com",
  projectId: "secondhandcar-f0b47",
  storageBucket: "secondhandcar-f0b47.appspot.com",
  messagingSenderId: "888455425089",
  appId: "1:888455425089:web:91c5d379ccb8b81401aac0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firestore
const db = getFirestore(app);

// ✅ Initialize Firebase Storage
const storage = getStorage(app);

// ✅ Export Firestore and Storage instances
export { db, storage };
