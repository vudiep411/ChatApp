import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

