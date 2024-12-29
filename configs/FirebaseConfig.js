// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlHEvCb1PKJE5Dedq12XZJEApVIdnOnCY",
  authDomain: "imrn-business.firebaseapp.com",
  projectId: "imrn-business",
  storageBucket: "imrn-business.appspot.com",
  messagingSenderId: "612582361452",
  appId: "1:612582361452:web:bb5e0355181d982274cb49",
  measurementId: "G-RWVLXGP0BV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 
export const storage = getStorage(app);

//const analytics = getAnalytics(app);

