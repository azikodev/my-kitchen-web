import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";

import { auth } from "../firebase/firebaseConfig";
import { useState } from "react";

import { login } from "../app/userSlice";
import { useDispatch } from "react-redux";

import toast from "react-hot-toast";
import { signInWithPopup } from "firebase/auth";
// import { GoogleAuthProvider } from 'firebase/auth';

export const useRegister = () => {
  const dispatch = useDispatch();
  const [isPending, setIspending] = useState(false);

  const register = async (email, password, displayName, photoURL) => {
    setIspending(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });
      const user = userCredential.user;
      setIspending(false);
      dispatch(login(user));
      setIspending(false);
      toast.success(`Welcome ${user.displayName}`);
    } catch (error) {
      toast.error(error.message);
      setIspending(false);
    }
  };

  const registerWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setIspending(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success(`Welcome ${user.displayName}`);
      // setIspending(false);
      dispatch(login(user));
      setIspending(false);
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      setIspending(false);
    }
  };

  return { isPending, registerWithGoogle, register };
};
