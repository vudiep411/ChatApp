import { collection, addDoc, setDoc, doc, getDocs, query, where, getDoc } from "firebase/firestore"; 
import { db } from "../firebase";
import { Firestore } from "firebase/firestore";

export const createOrUpdateUser = async (data, uid) => {
    await setDoc(doc(db, "users" , uid), {
        data
    })
}

export const getSearchUser = async (username, setUsers) => {
    const userRef = collection(db, "users")
    const q = query(userRef, 
        where('data.username', '>=', username),
        where('data.username', '<', username + `\uf8ff`)
    )
    const userSnap = await getDocs(q)
    let users = []
    userSnap.forEach(doc => {
        users.push({id: doc.id, ...doc.data()})
    })
    setUsers(users)
    return users
}


export const createChatRoom = async (data) => {
    const chatRoomRef = collection(db, "chatroom")
    const q = query(chatRoomRef, 
        where('data.members.id', "==", true))

    const roomSnap = await getDocs(q)
    
    let room = {}
    roomSnap.forEach(doc => {

    })
    /*
        {
            id: auto-gen
            members: {
                id : true
            }
            memberData: {
                id: {
                    image: url
                    username: username
                }
            }
            date: timeStamp
            lastMessage: Hello
        }
    */ 
}