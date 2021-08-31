// Importing Libraries
import firebase from "firebase/app";
import "firebase/auth";

// Firebase configuration keys (Removed for security purpose)
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
