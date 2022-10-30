import { Avatar, Button, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChatNavbar from '../components/ChatNavbar'
import { useMediaQuery } from 'react-responsive'
import ChangeUserName from '../components/profile/ChangeUserName'
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import { useEffect } from 'react'
import { getUser } from '../actions/user'
import ChangeAvatarModal from '../components/profile/ChangeAvatarModal'

const Profile = () => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 499px)' })
    const gap = isTabletOrMobile ? '30px' : '100px'
    const layout = isTabletOrMobile ? '' : 'flex'
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [bio, setBio] = useState('')
    const [open, setOpen] = useState(false)

    const addBio = async () => {
        await updateDoc(doc(db, 'users', user.id), {
            "data.bio": bio
        })
        dispatch({type: 'CHANGE_BIO', payload: bio})
        setBio('')
    }

    useEffect(() => {
        if(user.id) {
            dispatch(getUser(user.id))
        }
    }, [dispatch, user.id])
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
                    height: 150,
                }}
                onClick={() => setOpen(true)}
                >V</Avatar>
                <Avatar
                    src={user.image}
                    sx={{
                    cursor: 'pointer',
                    display: { xs: 'block', md: 'none' },
                    width: 100,
                    height: 100
                    }}
                    onClick={() => setOpen(true)}
                >V</Avatar>
                <ChangeAvatarModal open={open} setOpen={setOpen}/>
                <div style={{marginTop: '10px', width: '100%'}}>
                    <Typography variant='h4' style={{marginBottom: '10px'}}>{user.username}</Typography>
                    <Typography variant='body2'>&nbsp;{user.name}</Typography><br/>
                    <Typography variant='body2'>&nbsp;{user?.bio}</Typography>
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
                            value={bio}
                        />
                    {bio &&
                        <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '5px'}}>
                            <Button variant='contained' color='success' onClick={addBio}>Add</Button>
                            <Button variant='contained' color='inherit' onClick={() => setBio('')}>Cancel</Button>
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