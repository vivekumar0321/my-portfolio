import {
    collection,
    addDoc,
    doc,
    // getDoc,
    setDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";

import db from "./firestore";

class FirebaseService {

    async create(collectionName, data) {
        try {

            const document = await addDoc(
                collection(db, collectionName),
                {
                    ...data,
                    createdAt: new Date(),
                }
            );

            return {
                success: true,
                id: document.id,
            };

        } catch (error) {

            console.error(error);

            return {
                success: false,
                message: error.message,
            };
        }
    }

    async createWithId(collectionName, id, data) {

        try {

            await setDoc(doc(db, collectionName, id), {
                ...data,
                createdAt: new Date(),
            });

            return {
                success: true,
            };

        } catch (error) {

            console.error(error);

            return {
                success: false,
                message: error.message,
            };
        }
    }

    async exists(collectionName, field, value) {

        try {

            const q = query(
                collection(db, collectionName),
                where(field, "==", value)
            );

            const snapshot = await getDocs(q);

            return snapshot.docs.length > 0;

        } catch (error) {

            console.error(error);

            return false;
        }
    }

}

export default new FirebaseService();