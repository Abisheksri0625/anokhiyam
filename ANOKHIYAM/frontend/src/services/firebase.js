import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBw75ykIN62hJ2djL5u7IN2jbOWVzDIJOA",
  authDomain: "anokhiyam-7db6e.firebaseapp.com",
  projectId: "anokhiyam-7db6e",
  storageBucket: "anokhiyam-7db6e.appspot.com",
  messagingSenderId: "916351681816",
  appId: "1:916351681816:web:fc34590223a82993218a6d",
  measurementId: "G-XVRXN3HPZW"
};

// Check if Firebase app is already initialized
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp(); // Use existing app
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };
export default app;
