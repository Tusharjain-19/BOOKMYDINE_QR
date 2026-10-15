import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { 
  initializeAuth, 
  browserLocalPersistence, 
  browserSessionPersistence, 
  inMemoryPersistence, 
  getAuth 
} from "firebase/auth";

const env = (import.meta as any)?.env || (typeof process !== "undefined" ? process?.env : {});

const firebaseConfig = {
  apiKey: env?.VITE_FIREBASE_API_KEY || env?.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env?.VITE_FIREBASE_AUTH_DOMAIN || env?.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env?.VITE_FIREBASE_PROJECT_ID || env?.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env?.VITE_FIREBASE_STORAGE_BUCKET || env?.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env?.VITE_FIREBASE_MESSAGING_SENDER_ID || env?.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env?.VITE_FIREBASE_APP_ID || env?.NEXT_PUBLIC_FIREBASE_APP_ID
};

let app: any;
let db: any;
let auth: any;

const apiKey = firebaseConfig.apiKey;

if (apiKey) {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app);

  if (typeof window !== 'undefined') {
    try {
      auth = initializeAuth(app, {
        persistence: [browserLocalPersistence, browserSessionPersistence, inMemoryPersistence]
      });
    } catch (e) {
      auth = getAuth(app);
    }
  } else {
    auth = getAuth(app);
  }
} else {
  console.warn('Firebase API Key is missing in admin panel.');
}

export { app, db, auth };
