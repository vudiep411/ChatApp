import { Avatar } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUser } from '../actions/user'
import ChatNavbar from '../components/ChatNavbar'
import { useMediaQuery } from 'react-responsive'

const Profile = () => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 499px)' })
    const layout = isTabletOrMobile ? '' : 'flex'
    const user = useSelector(state => state.user)
    const [name, setName] = useState(user.name)
    const [username, setUsername] = useState(user.username)
    const [image, setImage] = useState(user.image)
   
  return (
    <div>
        <ChatNavbar/>
        <Container maxWidth='md' sx={{marginTop: '100px', display: layout}}>
            <Avatar
                src={image}
                sx={{
                width: 150,
                height: 150
                }}
            >V</Avatar>
        </Container>
        
    </div>
  )
}

export default Profile