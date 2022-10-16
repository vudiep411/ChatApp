import { Avatar, Button, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, {  useState } from 'react'
import { useSelector } from 'react-redux'
import ChatNavbar from '../components/ChatNavbar'
import { useMediaQuery } from 'react-responsive'
import ChangeUserName from '../components/profile/ChangeUserName'

const Profile = () => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 499px)' })
    const gap = isTabletOrMobile ? '30px' : '100px'
    const layout = isTabletOrMobile ? '' : 'flex'
    const user = useSelector(state => state.user)

    const [bio, setBio] = useState('')
   
  return (
    <div>
        <ChatNavbar/>
        <Container maxWidth='md' sx={{marginTop: '100px'}}>
            <div style={{display: layout, gap: gap}}>
                <Avatar
                    src={user.image}
                    sx={{
                    cursor: 'pointer',
                    display: { xs: 'none', md: 'block' },
                    width: 150,
                    height: 150
                    }}
                >V</Avatar>
                <Avatar
                    src={user.image}
                    sx={{
                    cursor: 'pointer',
                    display: { xs: 'block', md: 'none' },
                    width: 100,
                    height: 100
                    }}
                >V</Avatar>
                <div style={{marginTop: '10px', width: '100%'}}>
                    <Typography variant='h4' style={{marginBottom: '10px'}}>{user.username}</Typography>
                    <Typography variant='body2'>&nbsp;{user.name}</Typography>
                    <div style={{marginTop: '50px'}}>
                        <Typography variant='h5'>Change username</Typography>
                        <hr/><br/>
                    <ChangeUserName/>
                    </div>
                    <div style={{marginTop: '50px'}}>
                        <Typography variant='h5'>Add a bio</Typography>
                        <hr/><br/>
                        <TextField 
                            placeholder='Add your bio...'
                            fullWidth
                            multiline
                            minRows={4}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    {bio &&
                        <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '5px'}}>
                            <Button variant='contained' color='success'>Add</Button>
                            <Button variant='contained' color='inherit'>Cancel</Button>
                        </div>
                    }
                    </div>
                </div>
            </div>
        </Container>
        
    </div>
  )
}

export default Profile