import React from 'react'
import { Avatar, Typography } from '@mui/material'
import mck from '../utils/mock.jpg'

var data = Array.from({length: 20}, (v, i) => i)

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
            data?.map((val) => (
                <div style={{display: 'flex', gap: '15px', padding: '15px'}}>
                    <Avatar sx={{width: 50, height: 50}} src={mck}></Avatar>
                    <div>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <Typography><b>Vu Diep</b></Typography>
                            <Typography variant='body2' color='GrayText' style={{marginTop: '2px'}}>09/25/2022</Typography>
                        </div>
                        <Typography variant='body1' style={{marginTop: '2px'}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam pariatur, in rerum nostrum, asperiores mollitia molestias modi aspernatur perferendis repudiandae eligendi vero aliquid tenetur nam fugiat neque quisquam vitae et.</Typography>
                    </div>
                </div>
            ))
        }

    </div>
  )
}

export default Messages