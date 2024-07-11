import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const useCollection = (collectionName, whereData = [], orderData = []) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let q = query(collection(db, collectionName));

        if (whereData.length > 0) {
          q = query(q, where(...whereData));
        }

        if (orderData.length > 0) {
          q = query(q, orderBy(...orderData));
        }

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
          });
          setData(data);
        });

        return () => unsubscribe();

      } catch (error) {
        console.error("Error fetching collection data:", error);
      }
    };

    fetchData();
  }, [collectionName, whereData, orderData]);

  return { data };
};
