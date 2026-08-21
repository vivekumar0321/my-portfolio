import FirebaseService from "../firebase/firebaseService";
import COLLECTIONS from "../firebase/collections";
import { v4 as uuidv4 } from 'uuid';
export const storeSubscribe = async (email) => {
    try {
        const exists = await FirebaseService.exists(
            COLLECTIONS.SUBSCRIBERS,
            "email",
            email
        );

        if (exists) {

            return {
                success: false,
                message: "Email is already subscribed.",
            };

        }

        return await FirebaseService.create(
            COLLECTIONS.SUBSCRIBERS,
            {
                id: uuidv4(),
                status: true,
                email,
            }
        );

    } catch (error) {

        console.error(error);

        return {
            success: false,
            message: error.message,
        };
    }
}