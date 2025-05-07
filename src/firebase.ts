import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7f6VAN2nl2ocobYRSnlCCwPvTcwuGaOI",
  authDomain: "learning-e5a5d.firebaseapp.com",
  projectId: "learning-e5a5d",
  storageBucket: "learning-e5a5d.appspot.com",
  messagingSenderId: "793232253276",
  appId: "1:793232253276:web:08e07657fc2ad84dc86199",
  measurementId: "G-4M32YWVD5Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage }; 