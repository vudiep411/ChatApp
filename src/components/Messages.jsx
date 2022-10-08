import React, { useRef, useState }from 'react'
import { Avatar, Button, Typography } from '@mui/material'
import ChatField from './ChatField'
import { convert } from '../utils/functions'
import { useMediaQuery } from 'react-responsive'
import { useEffect } from 'react'
import { db } from '../firebase'
import { doc, onSnapshot } from "firebase/firestore"; 
import DeleteIcon from '@mui/icons-material/Delete';
import ModalImage from "react-modal-image";

const Messages = ({ selectedConvoId, messages, setMessages }) => {
    const [chatMsg, setChatMsg] = useState('')
    const [img, setImg] = useState()

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 499px)' })
    const height = isTabletOrMobile ? '81vh' : '87vh'
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
                             { val.contentImage &&
                             <div style={{maxWidth: '50%', maxHeight: '50%'}}>
                                 <ModalImage
                                     large={val.contentImage}
                                     small={val.contentImage}
                                     alt='Image'
                                 />
                             </div> 
                             }
                         </div>
                     </div>
                    )
                })}
                <span ref={dummy}></span>
             </div>
         }
         { selectedConvoId &&
         <div>
            {img && 
                <div style={{backgroundColor: 'rgb(240,240,240)', display: 'flex', borderRadius: '8px'}}>
                    <img 
                        style={{padding: '5px', maxWidth: '30%', maxHeight: '30%'}} 
                        src={img}
                        alt="img"
                    />
                    <Button color='error' 
                        style={{height: '20px', width: '20px', marginTop: '5px'}}
                        onClick={() => setImg(null)}
                    >    
                            <DeleteIcon fontSize='small'/>
                    </Button>
                </div>
            }
            <div>
                <ChatField 
                    chatMsg={chatMsg} 
                    setChatMsg={setChatMsg} 
                    selectedConvoId={selectedConvoId}
                    setImg={setImg}
                    img={img}
                />
            </div>
         </div>
         }
    </div>
  )
}

export default Messages