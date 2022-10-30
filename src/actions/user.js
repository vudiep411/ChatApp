import {  doc, getDoc, updateDoc } from "firebase/firestore"; 
import { db } from "../firebase";

export const getUser = (userId) => async (dispatch) => {
    const user = await getDoc(doc(db, 'users', userId))
    if(user.exists()) {
        dispatch({type: 'SET_USER_BIO', payload: user.data().data.bio})
    } else {
        console.log('No documents')
    }
}

export const changeAvatar = (userId, url) => async (dispatch) => {
    await updateDoc(doc(db, 'users', userId), {
        "data.image" : url
    }) 
    dispatch({type: 'CHANGE_AVATAR', payload: url})
}