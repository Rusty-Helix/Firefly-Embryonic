// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {collection, getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCp9jDnOAOMeeGQ9MpD0FKlkFk0Z1kw214",
  authDomain: "firefly-embryonic.firebaseapp.com",
  projectId: "firefly-embryonic",
  storageBucket: "firefly-embryonic.appspot.com",
  messagingSenderId: "367067635746",
  appId: "1:367067635746:web:f9b66546052bf4d4176a7b",
  measurementId: "G-XL8M7RZNTN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const userRef = collection(firebaseDB, "users");