declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';

declare namespace JSX {
  interface IntrinsicElements {
    'motion.div': any;
    'motion.button': any;
    'motion.h1': any;
  }
}

interface Window {
  firebaseConfig: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
} 