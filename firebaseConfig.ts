import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_YOUR_API_KEY,
  authDomain: import.meta.env.VITE_YOUR_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_YOUR_DATA_BASE_URL,
  projectId: import.meta.env.VITE_YOUR_PROJECT_ID,
  storageBucket: import.meta.env.VITE_YOUR_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_YOUR_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_YOUR_APP_ID,
  measurementId: import.meta.env.VITE_YOUR_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
