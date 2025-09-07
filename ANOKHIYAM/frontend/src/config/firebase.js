// Firebase configuration for ANOKHIYAM ERP System
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBw75ykIN62hJ2djL5u7IN2jbOWVzDIJOA",
  authDomain: "anokhiyam-7db6e.firebaseapp.com",
  projectId: "anokhiyam-7db6e",
  storageBucket: "anokhiyam-7db6e.firebasestorage.app",
  messagingSenderId: "916351681816",
  appId: "1:916351681816:web:fc34590223a82993218a6d",
  measurementId: "G-XVRXN3HPZW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics (optional)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
export const storage = getStorage(app);

// Connect to emulators if in development (optional)
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  // Uncomment these lines if you want to use Firebase emulators for local development
  // connectAuthEmulator(auth, "http://localhost:9099");
  // connectFirestoreEmulator(db, 'localhost', 8080);
  // connectStorageEmulator(storage, 'localhost', 9199);
}

// Export the initialized app and analytics as default
export { analytics };
export default app;
