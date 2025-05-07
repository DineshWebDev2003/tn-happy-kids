import { initializeApp } from 'firebase/app';
import { getAuth, PhoneAuthProvider, RecaptchaVerifier } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

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
auth.languageCode = 'en'; // Set default language

// Initialize reCAPTCHA verifier
const setupRecaptchaVerifier = (containerId: string) => {
  if (!window.recaptchaVerifier) {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with id ${containerId} not found`);
    }
    window.recaptchaVerifier = new RecaptchaVerifier(container, {
      'size': 'invisible',
      'callback': () => {
        // reCAPTCHA solved, allow signInWithPhoneNumber
        console.log('reCAPTCHA verified');
      }
    }, auth);
  }
  return window.recaptchaVerifier;
};

const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Analytics conditionally
let analytics = null;
isSupported().then(yes => yes && (analytics = getAnalytics(app)));

// Enable persistence for offline support
enableIndexedDbPersistence(db)
  .catch((err: { code: string }) => {
    if (err.code === 'failed-precondition') {
      console.log('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.log('The current browser does not support persistence.');
    }
  });

export { auth, db, analytics, storage, PhoneAuthProvider, setupRecaptchaVerifier }; 