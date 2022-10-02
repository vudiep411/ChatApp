import React, { useState }from 'react'
import { Avatar, Typography } from '@mui/material'
import ChatField from './ChatField'
import { convert } from '../utils/functions'

const Messages = ({ selectedConvoId, messages, setRooms }) => {
    const [chatMsg, setChatMsg] = useState('')
  return (
    <div 
        style={{
            marginTop: '64px', 
            width: '100vw',
            padding: '5px'
          }}>
          {selectedConvoId && 
              <div style={{height: '87vh', overflowY: 'scroll',}}>
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