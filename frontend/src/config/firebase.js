import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2stJwdRJcKvAWCLnc9P6_SbHiMxigBzQ",
  authDomain: "fir-blogger-101.firebaseapp.com",
  projectId: "fir-blogger-101",
  storageBucket: "fir-blogger-101.firebasestorage.app",
  messagingSenderId: "292971980145",
  appId: "1:292971980145:web:ad1370dd96619efb6c82d0",
  measurementId: "G-5DLPBQTD2P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Google Sign In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    return {
      success: true,
      user: {
        googleId: user.uid,
        email: user.email,
        name: user.displayName,
        avatar: user.photoURL,
      },
    };
  } catch (error) {
    console.error("Google sign-in error:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

// Sign out
export const firebaseSignOut = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export { auth };
