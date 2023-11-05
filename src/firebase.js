import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBMLwvVDvrQLSQrT2aHakpsPIX6CbVPzLQ",
  authDomain: "auth-822f2.firebaseapp.com",
  projectId: "auth-822f2",
  storageBucket: "auth-822f2.appspot.com",
  messagingSenderId: "705317315346",
  appId: "1:705317315346:web:15f6c5abcf6645000fc9cb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
