import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

let cachedAuth: Auth | null = null;

export const getFirebaseAuth = (): Auth => {
  if (cachedAuth) return cachedAuth;
  if (typeof window === 'undefined') {
    throw new Error('Firebase auth is client-only');
  }

  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;

  const missing = [
    !apiKey && 'NEXT_PUBLIC_FIREBASE_API_KEY',
    !authDomain && 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    !projectId && 'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    !appId && 'NEXT_PUBLIC_FIREBASE_APP_ID',
  ].filter(Boolean) as string[];

  if (missing.length) {
    throw new Error(`Missing Firebase env vars: ${missing.join(', ')}`);
  }

  const app = getApps().length
    ? getApp()
    : initializeApp({ apiKey, authDomain, projectId, appId });

  cachedAuth = getAuth(app);
  return cachedAuth;
};
