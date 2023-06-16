import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

export const firebase = initializeApp({
  apiKey: "AIzaSyCwSRr8y3HEptv4-tFnDD8ugvPWt3xGIO0",
  authDomain: "drp-whatson.firebaseapp.com",
  projectId: "drp-whatson",
  storageBucket: "drp-whatson.appspot.com",
  messagingSenderId: "895329265943",
  appId: "1:895329265943:web:9380102105051f6c186f52",
  databaseURL:
    "https://drp-whatson-default-rtdb.europe-west1.firebasedatabase.app",
});
export const db = getDatabase(firebase);
