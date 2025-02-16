// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEHKlnOrGogkW_NRY7xOtV8VZjgeXRsgA",
  authDomain: "pos-food-nsoul.firebaseapp.com",
  projectId: "pos-food-nsoul",
  storageBucket: "pos-food-nsoul.firebasestorage.app",
  messagingSenderId: "529554530596",
  appId: "1:529554530596:web:98d06201ed4843508193b1"
};
// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)



export  { app, auth, db };
