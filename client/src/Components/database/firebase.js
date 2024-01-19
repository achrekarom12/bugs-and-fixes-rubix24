// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNOFHFSILjwVGSbFrihsJ13_tkbctpYiQ",
  authDomain: "rubix24-50067.firebaseapp.com",
  projectId: "rubix24-50067",
  storageBucket: "rubix24-50067.appspot.com",
  messagingSenderId: "707574037322",
  appId: "1:707574037322:web:db0a2c418ba1e44a891fb3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
