import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: VITE_YOUR_API_KEY,
  authDomain: VITE_YOUR_AUTH_DOMAIN,
  projectId: VITE_YOUR_PROJECT_ID,
  storageBucket: VITE_YOUR_STORAGE_BUCKET,
  messagingSenderId: VITE_YOUR_MESSAGING_SENDER_ID,
  appId: VITE_YOUR_APP_ID,
  measurementId: VITE_YOUR_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
