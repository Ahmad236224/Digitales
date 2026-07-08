import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function cleanEnvValue(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  return value.trim().replace(/,$/, "").replace(/^"|"$/g, "");
}

function getPrivateKey() {
  const privateKey = cleanEnvValue(process.env.FIREBASE_PRIVATE_KEY);

  if (!privateKey) {
    return undefined;
  }

  return privateKey.replace(/\\n/g, "\n");
}

function getAdminApp() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  return initializeApp({
    credential: cert({
      projectId: cleanEnvValue(process.env.FIREBASE_PROJECT_ID),
      clientEmail: cleanEnvValue(process.env.FIREBASE_CLIENT_EMAIL),
      privateKey: getPrivateKey(),
    }),
  });
}

export function getAdminDb() {
  return getFirestore(getAdminApp());
}
