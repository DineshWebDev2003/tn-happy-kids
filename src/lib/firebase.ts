import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// For debugging - logging the environment variables
console.log("API KEY:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
console.log("AUTH DOMAIN:", process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN);

const firebaseConfig = {
  apiKey: "AIzaSyC7f6VAN2nl2ocobYRSnlCCwPvTcwuGaOI",
  authDomain: "learning-e5a5d.firebaseapp.com",
  projectId: "learning-e5a5d",
  storageBucket: "learning-e5a5d.appspot.com",
  messagingSenderId: "793232253276",
  appId: "1:793232253276:web:08e07657fc2ad84dc86199",
  measurementId: "G-4M32YWVD5Q"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export default app; 