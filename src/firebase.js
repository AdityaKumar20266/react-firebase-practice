import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB19gOd-jiscoIg_LBzX1SuTKbGwoxTVwo",
  authDomain: "fir-practice-91d72.firebaseapp.com",
  projectId: "fir-practice-91d72",
  storageBucket: "fir-practice-91d72.appspot.com",
  messagingSenderId: "954672634902",
  appId: "1:954672634902:web:b6d4949af12f71cd0b6937"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
