import React, { useRef, useState }from 'react'
import { Avatar, Typography } from '@mui/material'
import ChatField from './ChatField'
import { convert } from '../utils/functions'
import { useMediaQuery } from 'react-responsive'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { db } from '../firebase'
import { doc, onSnapshot } from "firebase/firestore"; 

const Messages = ({ selectedConvoId, messages, setMessages }) => {
    const [chatMsg, setChatMsg] = useState('')
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 499px)' })
    const height = isTabletOrMobile ? '82vh' : '87vh'
    const dummy = useRef()

    // Always scroll to the bottom
    useEffect(() => {
        if(selectedConvoId)
            dummy.current.scrollIntoView();      
    }, [messages, selectedConvoId])
     
    // Get live messages
    useEffect(() => {
        if(selectedConvoId) {
            const unSub = onSnapshot(doc(db, 'conversations', selectedConvoId), (doc) => {
                if (doc.exists()) { 
                    setMessages(prev => {
                        if(prev.id) {
                            return prev.id === doc.id ? {id: doc.id, messages: doc.data().messages} : prev
                        } else 
                            return {id: doc.id, messages: doc.data().messages}                       
                    })
                } else 
                    setMessages({id: '', messages: []})               
            })
            console.log('here')
            return () => unSub()         
        }
    }, [selectedConvoId])
  return (
    <div 
        style={{
            marginTop: '64px', 
            width: '100vw',
            padding: '5px'
          }}        
    >
          {selectedConvoId && 
              <div style={{height: height, overflowY: 'scroll'}}>
                  {messages.messages?.map((val, i) => {
                    const formatDate = convert(val.date.toDate().toString())
                    return (
                      <div style={{display: 'flex', gap: '15px', padding: '15px'}} key={i}>
                         <Avatar sx={{width: 50, height: 50}} src={val.image}/>
                         <div>
                             <div style={{display: 'flex', gap: '10px'}}>
                                 <Typography><b>{val.username}</b></Typography>
                                 <Typography variant='body2' color='GrayText' style={{marginTop: '2px'}}>{formatDate}</Typography>
                             </div>
                             <Typography variant='body1' style={{marginTop: '2px'}}>
                                 {val.message}
                             </Typography>
                         </div>
                     </div>
                    )
                })}
                <span ref={dummy}></span>
             </div>
         }
         { selectedConvoId &&
            <div>
                <ChatField chatMsg={chatMsg} setChatMsg={setChatMsg} selectedConvoId={selectedConvoId}/>
            </div>
         }
    </div>
  )
}

export default Messages