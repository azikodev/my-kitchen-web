//rrd imports
import { useNavigate } from "react-router-dom";

//firebase
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

//react hot toast
import { Toaster, toast } from 'sonner'



export const useFirestore = () => {
  const navigate = useNavigate();
  //add todo
  const addTodo = async (newTodo) => {
    await addDoc(collection(db, "todos"), {
      ...newTodo,
      createdAt: serverTimestamp(),
    });
    toast.success("Retsept muvaffaqiyatli qo'shildi");
    navigate("/");
  };


  //delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    toast.success("Retsept muvaffaqiyatli o'chirildi");
  };
  return { addTodo, deleteTodo };
};
