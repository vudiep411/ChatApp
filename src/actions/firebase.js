import { collection, setDoc, doc, getDocs, query, where, getDoc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore"; 
import { db } from "../firebase";

// Create a new User account when first sign in
export const createOrUpdateUser = (data, uid, navigate) => async (dispatch) => {
    const user = await getDoc(doc(db, 'users', uid))

    if(!user.exists()) { 
        await setDoc(doc(db, "users" , uid), {
            data,
            update: false   
        }, {merge: true})
        dispatch({type: 'AUTH_USER', payload: {...data, id: uid}})
    } else {
        const username = user.data().data.username
        dispatch({type: 'AUTH_USER', payload: {...data, id: uid, username: username}})
    }
    navigate('/')
}


// Query Search user
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


// Create a room if not exist on new usersd
export const createOrSelectChatRoom = (id, currentId, setMessages) => async (dispatch) => {
    const currentUserRef = doc(db, 'users', currentId)
    const currentUserSnap = await getDoc(currentUserRef)

    const roomIds = currentUserSnap.data().chatrooms
    const combinedId = currentId > id ? currentId + id : id + currentId

    const roomData = { 
        memberId: [id, currentId],
        date: new Date(),
    }
    
    // if user has 0 rooms active
    if(!roomIds) {  
        await setDoc(doc(db, "rooms" , combinedId), {
            ...roomData
        })
        await updateDoc(doc(db, 'users', currentId), { 
            chatrooms: [combinedId]            
        })
    }
    // if user has a chatroom but not this convo
    else if(!roomIds.includes(combinedId)) { 
        await setDoc(doc(db, "rooms" , combinedId), {
            ...roomData
        })
        await updateDoc(doc(db, 'users', currentId), {
            chatrooms: arrayUnion(combinedId)            
        })
    }

    // toggle the conversations if already exist to display
    dispatch({type: 'SET_CONVO', payload: combinedId})
    const convo = await getDoc(doc(db, 'conversations', combinedId))
    if(convo.exists()) {
        setMessages({id: convo.id, messages: convo.data().messages})
    } else {
        setMessages({id: '', messages: []})
    }

}


// Get chatrooms for Sidebar display
export const getChatRooms = (currentId) => async(dispatch) => {
    const d = doc
    // Get real time user's chatrooms to display on sidebar
    await onSnapshot(doc(db, 'users', currentId), async (doc) => {
        if (doc.exists()) {
            const roomListId = doc.data().chatrooms    
            let rooms = []

            if(roomListId) {
                let members = []

                for(let i = 0; i < roomListId.length; i++) {
                    const roomData = await getDoc(d(db, 'rooms', roomListId[i]))
                    const memberIdArray = roomData.data().memberId

                    for(let i = 0; i < memberIdArray.length; i++) {
                        const memberData = await getDoc(d(db, 'users', memberIdArray[i]))

                        if(memberData.exists() && memberData.id !== currentId) {
                            members.push({...memberData.data().data, id: memberData.id})
                        }
                    }
                    rooms.push({id: roomData.id, ...roomData.data(), members: members})
                    members = []
                }
            }
            dispatch({type: 'GET_ROOMS', payload: rooms})         
        } 
    })
}


// Handle sending message
export const sendMessage = (selectedConvoId, chatMsg, currentUser, url) => async (dispatch) => {
    const conversations = await getDoc(doc(db, 'conversations', selectedConvoId))
    const messageData = {
        contentImage: url,
        message: chatMsg,
        uid: currentUser.id,
        image: currentUser.image,
        username: currentUser.username,
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
    // Add to sidebar room display if needed
    const roomRef = await getDoc(doc(db, 'rooms', selectedConvoId))
    if(roomRef.exists()) {
        await updateDoc(doc(db, 'rooms', selectedConvoId), {
            date: new Date(),
            lastMessage: url ? 'Attachment' : chatMsg,
            lastSender: currentUser.id,
            read: false
        })
        for(let i = 0; i < roomRef.data().memberId.length; i++) {
            const userInRoomRef = await getDoc(doc(db, 'users', roomRef.data().memberId[i]))
            const dummy = !userInRoomRef.data().update
            // filter out the new room to move that new room to the front
            const filterChatrooms = userInRoomRef.data()?.chatrooms?.filter(roomId => roomId !== selectedConvoId)
            const prevChatrooms = filterChatrooms ? filterChatrooms : []
                await updateDoc(doc(db, 'users', userInRoomRef.id), {
                    chatrooms: [selectedConvoId, ...prevChatrooms],
                    update: dummy
                })
        }
    }
}


export const getConversation = (convoId, setMessages) => async (dispatch) => {
    await updateDoc(doc(db, 'rooms', convoId), {
        read: true
    })
    dispatch({type: 'READ_MSG', payload: convoId})
    const message = await getDoc(doc(db, 'conversations', convoId))
    if(message.exists()) {
        const messagesArr = []
        for(let i = 0; i < message.data().messages.length; i++) {
            const userId = message.data().messages[i].uid
            const userData = await getDoc(doc(db, 'users', userId))
            if(userData) {
                messagesArr.push({...message.data().messages[i], 
                                image: userData.data().data.image,
                                username: userData.data().data.username
                            })
            }
        }
        setMessages({
            id: message.id, 
            messages: messagesArr, 
        })
    }
}