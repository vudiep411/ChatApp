import { collection, addDoc, setDoc, doc, getDocs, query, where, getDoc, updateDoc, arrayUnion, serverTimestamp, onSnapshot } from "firebase/firestore"; 
import { connectStorageEmulator } from "firebase/storage";
import { db } from "../firebase";

export const createOrUpdateUser = async (data, uid) => {
    const user = await getDoc(doc(db, 'users', uid))

    if(!user.exists())
    { 
        await setDoc(doc(db, "users" , uid), {
            data,
            update: false   
        }, {merge: true})
    }
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

export const createOrSelectChatRoom = async (id, currentId, setSelectedConvoId, setMessages) => {
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
        await updateDoc(doc(db, 'users', currentId), {
            chatrooms: [combinedId]            
        })

        // Create a room in rooms collection
        await setDoc(doc(db, "rooms" , combinedId), {
            memberId: [id, currentId],
            members : roomMembers,
            date: serverTimestamp(),
        })
    }
    else if(!roomIds.includes(combinedId)){
        await updateDoc(doc(db, 'users', currentId), {
            chatrooms: arrayUnion(combinedId)            
        })

        // Create a room in rooms collection
        await setDoc(doc(db, "rooms" , combinedId), {
            memberId: [id, currentId],
            members : roomMembers,
            date: serverTimestamp(),
        })
    }
    setSelectedConvoId(combinedId)
    const convo = await getDoc(doc(db, 'conversations', combinedId))
    if(convo.exists()) {
        setMessages(convo.data().messages)
    } else {
        setMessages([])
    }

}

export const getChatRooms = async (currentId, setRooms) => {
    const d = doc
    await onSnapshot(doc(db, 'users', currentId), async (doc) => {
        if (doc.exists()) {
            const roomListId = doc.data().chatrooms
            let rooms = []
            if(roomListId) {
                for(let i = 0; i < roomListId.length; i++) {
                    const roomData = await getDoc(d(db, 'rooms', roomListId[i]))
                    rooms.push({id: roomData.id, ...roomData.data()})
                }
            }
            setRooms(rooms)          
        } 
    })
}

export const sendMessage = (selectedConvoId, chatMsg, currentUser, setRooms) => async (dispatch) => {
    const conversations = await getDoc(doc(db, 'conversations', selectedConvoId))
    const messageData = {
        message: chatMsg,
        uid: currentUser.id,
        username: currentUser.username,
        image: currentUser.image,
        date: new Date()
    }

    if(!conversations.exists()) {
        await setDoc(doc(db, 'conversations', selectedConvoId),{
            messages: [messageData]
        })
    }
    else {
        await updateDoc(doc(db, 'conversations', selectedConvoId), {
            messages: arrayUnion(messageData)
        })
    }

    // add to room display if needed
    const roomRef = await getDoc(doc(db, 'rooms', selectedConvoId))
    if(roomRef.exists())
    {
        await updateDoc(doc(db, 'rooms', selectedConvoId), {
            lastMessage: chatMsg
        })
        for(let i = 0; i < roomRef.data().memberId.length; i++)
        {
            const userInRoomRef = await getDoc(doc(db, 'users', roomRef.data().memberId[i]))
            const dummy = !userInRoomRef.data().update
                await updateDoc(doc(db, 'users', userInRoomRef.id), {
                    chatrooms: arrayUnion(selectedConvoId),
                    update: dummy
                })}
    }
}

export const getConversation = (convoId, setMessages) => async (dispatch) => {
    await onSnapshot(doc(db, 'conversations', convoId), (doc) => {
        if (doc.exists()) {   
            setMessages(doc.data().messages)
        } 
        else
            setMessages([])
    })

}