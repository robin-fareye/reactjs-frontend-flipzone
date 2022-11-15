// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDG6oKNlrhBC2URS1T8Gvq5Wjl8nKLynkE",
  authDomain: "flipzone-d901b.firebaseapp.com",
  projectId: "flipzone-d901b",
  storageBucket: "flipzone-d901b.appspot.com",
  messagingSenderId: "327808975394",
  appId: "1:327808975394:web:3e982fb8f545318b0fc07b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);