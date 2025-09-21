// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAxrYV2R8PLLrJLHSwgcg_gkFttWtr-2Go",
  authDomain: "ap-helper-7a6ac.firebaseapp.com",
  projectId: "ap-helper-7a6ac",
  storageBucket: "ap-helper-7a6ac.firebasestorage.app",
  messagingSenderId: "947116941994",
  appId: "1:947116941994:web:419f67156b2c9f01b466d3",
  measurementId: "G-BWBT538YWD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);