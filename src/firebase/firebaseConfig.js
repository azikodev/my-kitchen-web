import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCnrbfSpSvTei-e6tz3TyUP9d4lToPKV9I",
  authDomain: "my-recipes-8fb2d.firebaseapp.com",
  projectId: "my-recipes-8fb2d",
  storageBucket: "my-recipes-8fb2d.appspot.com",
  messagingSenderId: "548047925336",
  appId: "1:548047925336:web:a711af57d43dc25dc05a2d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

//db  
export const db = getFirestore(app);
