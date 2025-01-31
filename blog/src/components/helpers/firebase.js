// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getEnv } from "./getenv";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_APP'),
  authDomain: "kishanblog-269e6.firebaseapp.com",
  projectId: "kishanblog-269e6",
  storageBucket: "kishanblog-269e6.firebasestorage.app",
  messagingSenderId: "336051827290",
  appId: "1:336051827290:web:ae45db88bfa0e7f4d29e63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);

const provider=new GoogleAuthProvider();
export {auth,provider}