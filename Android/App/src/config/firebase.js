// Import the functions you need from the SDKs you need
import firebase from "firebase";
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCfUQPN08fuLMJn-03iuW5T8U3egnO4zTc",
  authDomain: "final-project-9dfc4.firebaseapp.com",
  projectId: "final-project-9dfc4",
  storageBucket: "final-project-9dfc4.appspot.com",
  messagingSenderId: "381379409864",
  appId: "1:381379409864:web:7c3ac3a882b46c1539f2fd",
  measurementId: "G-NECPFXBXM7"
};

// Initialize Firebase
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore};