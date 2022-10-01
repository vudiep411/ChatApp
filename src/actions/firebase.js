import { collection, addDoc, setDoc, doc, getDocs, query, where, getDoc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore"; 
import { db } from "../firebase";
import { Firestore } from "firebase/firestore";

export const createOrUpdateUser = async (data, uid) => {
    await setDoc(doc(db, "users" , uid), {
        data
    })
}

export const getSearchUser = async (username, setUsers, currentId) => {
    const userRef = collection(db, "users")
    const q = query(userRef, 
        where('data.username', '>=', username),
        where('data.username', '<', username + `\uf8ff`)
    )
    const userSnap = await getDocs(q)
    let users = []
    userSnap.forEach(doc => {
        if(doc.id !== currentId)
            users.push({id: doc.id, ...doc.data()})
    })
    setUsers(users)
    return users
}

export const createOrSelectChatRoom = async (id, currentId, setSelectedConvoId) => {
    const userRef = doc(db, 'users', id)
    const userSnap = await getDoc(userRef)

    const currentUserRef = doc(db, 'users', currentId)
    const currentUserSnap = await getDoc(currentUserRef)

    const roomIds = currentUserSnap.data().chatrooms
    const combinedId = currentId > id ? currentId + id : id + currentId

    const roomMembers = [{...userSnap.data().data, id: userSnap.id}, {...currentUserSnap.data().data, id: currentUserSnap.id}]

    // if user has 0 rooms active
    if(!roomIds) {
        // Set a new room id
        await updateDoc(userRef, {
            chatrooms: [combinedId]
        })
        await updateDoc(doc(db, 'users', currentId), {
            chatrooms: [combinedId]            
        })

        // Create a room in rooms collection
        await setDoc(doc(db, "rooms" , combinedId), {
            memberId: {
                [id] : true,
                [currentId]: true
            },
            members : roomMembers,
            date: serverTimestamp(),
            lastMessage: ''
        })
    }
    else if(!roomIds.includes(combinedId)){
        await updateDoc(userRef, {
            chatrooms: arrayUnion(combinedId)
        })
        await updateDoc(doc(db, 'users', currentId), {
            chatrooms: arrayUnion(combinedId)            
        })

        // Create a room in rooms collection
        await setDoc(doc(db, "rooms" , combinedId), {
            memberId: {
                [id] : true,
                [currentId]: true
            },
            members : roomMembers,
            date: serverTimestamp(),
            lastMessage: ''
        })
    }
}

export const getChatRooms =  (currentId) => async(dispatch) => {
    const roomsRef = collection(db, 'rooms')
    const q = query(roomsRef, 
            where(`memberId.${currentId}`, '==', true))
    const roomSnap = await getDocs(q)
    let rooms = []
    roomSnap.forEach(doc => {
        const d = doc.data().date.toDate().toLocaleString('en-US')
        rooms.push({...doc.data(), date: d, id: doc.id})
    })
    dispatch({type: 'GET_ROOMS', payload: rooms})
}

export const sendMessage = async () => {

}