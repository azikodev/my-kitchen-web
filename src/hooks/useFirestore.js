import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useFirestore = () => {
  const navigate = useNavigate();
  //add todo
  const addTodo = async (newTodo) => {
    await addDoc(collection(db, "todos"), {
      ...newTodo,
      createdAt: serverTimestamp(),
    });
    toast.success("New todo added");
    navigate("/");
  };


  //delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    toast.success("Todo deleted");
  };
  return { addTodo, deleteTodo };
};
