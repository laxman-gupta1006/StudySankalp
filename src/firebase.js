// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getDatabase } from 'firebase/database'; // Import Realtime Database components


const firebaseConfig = {
    apiKey: "AIzaSyCfIfylULyWXEHPbU7G1v1em-JvhGR-6fU",
    authDomain: "studysankalp.firebaseapp.com",
    projectId: "studysankalp",
    storageBucket: "studysankalp.appspot.com",
    messagingSenderId: "220885030644",
    appId: "1:220885030644:web:2fd19bd24b272615b0f0a1",
    measurementId: "G-BKVQ0CLLF6"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const db = getDatabase(); // Initialize Realtime Database
  
  export { auth, provider, signInWithPopup, signOut, db };