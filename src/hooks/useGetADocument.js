//firebase
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export function useGetADocument() {
    const getDocument = async (col, id) => {
        try {
            const docRef = doc(db, col, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                throw new Error("No such document");
            }
        } catch (error) {
            throw error;
        }
    }

    return { getDocument };
}
