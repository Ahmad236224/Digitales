import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig as fallbackFirebaseConfig } from "./firebaseconfig";

function cleanEnvValue(value: string | undefined) {
  if (!value) {
    return "";
  }

  return value.trim().replace(/,$/, "").replace(/^"|"$/g, "");
}

const envFirebaseConfig = {
  apiKey: cleanEnvValue(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
  authDomain: cleanEnvValue(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
  projectId: cleanEnvValue(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
  storageBucket: cleanEnvValue(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: cleanEnvValue(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
  appId: cleanEnvValue(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
  measurementId: cleanEnvValue(process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID),
};

const firebaseConfig = envFirebaseConfig.apiKey
  ? envFirebaseConfig
  : fallbackFirebaseConfig;

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
