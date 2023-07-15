// google authentication using firebase

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDqFEBu-OXAdinfRQ6FJ13Vhwhxnhr_fr8",
  authDomain: "clone-9c032.firebaseapp.com",
  projectId: "clone-9c032",
  storageBucket: "clone-9c032.appspot.com",
  messagingSenderId: "367352782125",
  appId: "1:367352782125:web:2e71a23da21ae5710247a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()

export const provider = new GoogleAuthProvider()

export default app