//firebase
import {
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

//react + hook
import { useState } from "react";

//redux
import { login } from "../app/userSlice";
import { useDispatch } from "react-redux";

//react hot toast
import { Toaster, toast } from 'sonner'


export const useLogin = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);

  const loginUser = async (email, password) => {
    console.log(email, password);
    setIsPending(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      setIsPending(false);
      dispatch(login(user));
      setIsPending(false);
      toast.success(`Welcome ${user.displayName}`);
    } catch (error) {
      toast.error(error.message);
      setIsPending(false);
    }
  };

  return { isPending, loginUser };
};
