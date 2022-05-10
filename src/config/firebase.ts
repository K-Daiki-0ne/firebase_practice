import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from  'firebase/auth';
import { getStorage } from "firebase/storage";

const config = {
  apiKey:             process.env.NEXT_PUBLIC_APIKEY,
  authDomain:         process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId:          process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket:      process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId:  process.env.NEXT_PUBLIC_MESSAGEINGSENDERID,
  appId:              process.env.NEXT_PUBLIC_APPID,
  measurementId:      process.env.NEXT_PUBLIC_MEASUREMENTID
};

const firebaseApp = initializeApp(config);

export const db       = getFirestore(firebaseApp);
export const auth     = getAuth();
export const storage  = getStorage();
export const provider = new GoogleAuthProvider();

export const signInPopup = signInWithPopup(auth, provider);