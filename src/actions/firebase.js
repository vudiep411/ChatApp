import { collection, addDoc, setDoc, doc, getDocs, query, where } from "firebase/firestore"; 
import { db } from "../firebase";

export const createOrUpdateUser = async (data, uid) => {
    await setDoc(doc(db, "users" , uid), {
        data
    })
}

export const getUser = async (username) => {
    const q = query(collection(db, "users"), where('username', '==', username))
    const querySnapshot = await getDocs(q);
    return querySnapshot;
}

export const createChatRoom = async () => {
    /*
       [
            {
                id: auto-gen
                member: [
                    {
                        id: foundUser.uid,
                        image: foundUser.image,
                        username: foundUser.username
                    },
                    {
                        id: user.uid
                        image: user.image,
                        username: user.username
                    }
                ]
                date: timeStamp
                lastMessage: Hello
            }
        ]
    */ 
}