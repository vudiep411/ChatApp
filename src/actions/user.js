import { collection, setDoc, doc, getDocs, query, where, getDoc, updateDoc, arrayUnion, serverTimestamp, onSnapshot } from "firebase/firestore"; 
import { db, storage } from "../firebase";

export const getUser = (userId) => async (dispatch) => {
    const user = await getDoc(doc(db, 'users', userId))
    if(user.exists()) {
        console.log(user.data())
    } else {
        console.log('No documents')
    }
}