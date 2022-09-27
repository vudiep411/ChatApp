import React from 'react'
import { Avatar, Typography } from '@mui/material'
import mck from '../utils/images/mock.jpg'
import { userMessages } from '../utils/mockdata'

// var data = Array.from({length: 20}, (v, i) => i)
const data = userMessages

const Messages = () => {
  return (
    <div 
        style={{
            marginTop: '64px', 
            height: '85vh', 
            width: '100vw',
            overflowY: 'scroll'
            }}>
        {
            data?.map((val, i) => (
                <div style={{display: 'flex', gap: '15px', padding: '15px'}} key={i}>
                    <Avatar sx={{width: 50, height: 50}} src={val.image}/>
                    <div>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <Typography><b>{val.username}</b></Typography>
                            <Typography variant='body2' color='GrayText' style={{marginTop: '2px'}}>09/25/2022</Typography>
                        </div>
                        <Typography variant='body1' style={{marginTop: '2px'}}>
                            {val.messages}
                        </Typography>
                    </div>
                </div>
            ))
        }

    </div>
  )
}

export default Messages