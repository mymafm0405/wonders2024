// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAElUL2N8hF3nCXLwFGRM12Jdmlh6t2LC4",
  authDomain: "wonders-a0885.firebaseapp.com",
  projectId: "wonders-a0885",
  storageBucket: "wonders-a0885.appspot.com",
  messagingSenderId: "58121150703",
  appId: "1:58121150703:web:248d57ef8e65b2c09b7b1a",
  measurementId: "G-FREG439C26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage();
