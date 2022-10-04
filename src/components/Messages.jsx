import React, { useRef, useState }from 'react'
import { Avatar, Typography } from '@mui/material'
import ChatField from './ChatField'
import { convert } from '../utils/functions'
import { useMediaQuery } from 'react-responsive'
import { useEffect } from 'react'

const Messages = ({ selectedConvoId, messages, setRooms }) => {
    const [chatMsg, setChatMsg] = useState('')
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 499px)' })
    const height = isTabletOrMobile ? '82vh' : '87vh'
    const dummy = useRef()

    useEffect(() => {
        if(selectedConvoId)
            dummy.current.scrollIntoView();        
    }, [messages, selectedConvoId])
     
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
                  {messages?.map((val, i) => {
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
                <ChatField chatMsg={chatMsg} setChatMsg={setChatMsg} selectedConvoId={selectedConvoId} setRooms={setRooms}/>
            </div>
         }
    </div>
  )
}

export default Messages