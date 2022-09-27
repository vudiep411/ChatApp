import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyChQoppo-SOOwe_OU1ou3afHxu6zaV_ruA",
  authDomain: "chatapp-be9bd.firebaseapp.com",
  databaseURL: "https://chatapp-be9bd-default-rtdb.firebaseio.com",
  projectId: "chatapp-be9bd",
  storageBucket: "chatapp-be9bd.appspot.com",
  messagingSenderId: "386689330092",
  appId: "1:386689330092:web:5a0d4037068442b7276809",
  measurementId: "G-YXSJSDMLW7"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth()

