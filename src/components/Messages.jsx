import React, { useState }from 'react'
import { Avatar, Typography } from '@mui/material'
import { messages } from '../utils/mockdata'
import ChatField from './ChatField'


const Messages = ({ selectedConvoId }) => {
    const [chatMsg, setChatMsg] = useState('')
    // Test Code
    let convo
    const data = selectedConvoId ? messages.map((mes) => 
    {
        if (mes.id === selectedConvoId)  
            convo = mes.conversations
        return mes
    }) : null
  
  return (
    <div 
        style={{
            marginTop: '64px', 
            width: '100vw',
            padding: '5px'
          }}>
          {selectedConvoId && 
              <div style={{height: '87vh', overflowY: 'scroll',}}>
                  {convo?.map((val, i) => (
                      <div style={{display: 'flex', gap: '15px', padding: '15px'}} key={i}>
                         <Avatar sx={{width: 50, height: 50}} src={val.image}/>
                         <div>
                             <div style={{display: 'flex', gap: '10px'}}>
                                 <Typography><b>{val.username}</b></Typography>
                                 <Typography variant='body2' color='GrayText' style={{marginTop: '2px'}}>{val.date}</Typography>
                             </div>
                             <Typography variant='body1' style={{marginTop: '2px'}}>
                                 {val.message}
                             </Typography>
                         </div>
                     </div>
                 ))}
             </div>
         }
         { selectedConvoId &&
            <div>
                <ChatField chatMsg={chatMsg} setChatMsg={setChatMsg}/>
            </div>
         }
    </div>
  )
}

export default Messages