import {  doc, getDoc } from "firebase/firestore"; 
import { db } from "../firebase";

export const getUser = (userId) => async (dispatch) => {
    const user = await getDoc(doc(db, 'users', userId))
    if(user.exists()) {
        dispatch({type: 'SET_USER_BIO', payload: user.data().data.bio})
    } else {
        console.log('No documents')
    }
}

