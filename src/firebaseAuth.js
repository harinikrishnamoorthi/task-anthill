import { initializeApp } from "firebase/app";
import { 
  getAuth, GoogleAuthProvider, signInWithPopup, signOut,
  createUserWithEmailAndPassword, signInWithEmailAndPassword 
} from "firebase/auth";

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
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google Sign-In
const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

// Email & Password Signup
const signUpWithEmail = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Email & Password Login
const signInWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Logout
const logOut = () => {
  return signOut(auth);
};

export { auth, signInWithGoogle, signUpWithEmail, signInWithEmail, logOut };
