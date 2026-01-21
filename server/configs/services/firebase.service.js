// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
