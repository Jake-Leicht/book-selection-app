import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase-config";

// * Get snapshot/data from Firebase DB
const GetInfo = async () => {
    return await getDocs(collection(db, "book-collection"));
}

export default GetInfo;