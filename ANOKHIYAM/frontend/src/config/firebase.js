// src/config/firebase.js
// Firebase configuration for ANOKHIYAM ERP System

import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
// REMOVED: import { getStorage } from 'firebase/storage'; - No file uploads needed
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBw75ykIN62hJ2djL5u7IN2jbOWVzDIJOA",
  authDomain: "anokhiyam-7db6e.firebaseapp.com",
  projectId: "anokhiyam-7db6e",
  storageBucket: "anokhiyam-7db6e.firebasestorage.app", // Keep for reference but not used
  messagingSenderId: "916351681816",
  appId: "1:916351681816:web:fc34590223a82993218a6d",
  measurementId: "G-XVRXN3HPZW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics (optional)
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// REMOVED: Firebase Storage initialization - No file uploads in simplified version
// export const storage = getStorage(app);

// Connect to emulators if in development (optional)
if (process.env.NODE_ENV === 'development') {
  // Uncomment these lines if you want to use Firebase emulators for local development
  // connectAuthEmulator(auth, "http://localhost:9099");
  // connectFirestoreEmulator(db, 'localhost', 8080);
}

// Export the initialized app as default
export default app;
