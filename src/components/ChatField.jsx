import React from 'react'
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../actions/firebase';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL  } from 'firebase/storage';
import { useState } from 'react';
import { Typography } from '@mui/material';
import useSound from 'use-sound'
import pop from '../audio/pop.wav'

const ChatField = ({ chatMsg, setChatMsg, selectedConvoId, setImg }) => {
    const [fileUpload, setFileUpload] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const [playSend] = useSound(pop)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const handleSend = async () => {
        let url = null

        // If there is an image
        if(fileUpload) {
            const storageRef = ref(storage, fileUpload.name)
            const uploadTask = uploadBytesResumable(storageRef, fileUpload)
            setIsLoading(true)
            uploadTask.on('state_changed',
            (snapshot) => { // show progress
                const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 
            },
            (error) => console.log(error))
            await uploadTask
            url = await getDownloadURL(uploadTask.snapshot.ref)
        }
        playSend()
        setIsLoading(false)
        dispatch(sendMessage(selectedConvoId, chatMsg, user, url))
        setFileUpload(null)
        setImg(null)
        setChatMsg('')
    }
    const handleKeydown = (e) => {
        if(e.key === 'Enter' && chatMsg) {
            e.preventDefault()
            handleSend()
        }
    }

    // render the uploaded image on the chatbar
    const uploadImage = (e) => {
        const selectedImage = e.target.files[0]
        setFileUpload(selectedImage)
        setImg(URL.createObjectURL(selectedImage))
    }

  return (
        <FormControl fullWidth onKeyDown={(e) => handleKeydown(e)} style={{backgroundColor: 'rgb(240,240,240)'}}>
            <OutlinedInput
                multiline
                size="small"
                id="outlined-adornment-amount"
                onChange={(e) => {setChatMsg(e.target.value)}}
                startAdornment={
                    <InputAdornment position="start" >
                        <input 
                            onChange={uploadImage}
                            type='file' 
                            id='add'
                            style={{display: 'none'}} 
                            accept='image/*'   
                        />
                        <label htmlFor='add'>
                            <AddCircleIcon style={{cursor: 'pointer', marginTop: '5px'}}/>
                        </label>
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position="end">
                        { (chatMsg || fileUpload) &&
                        <div>
                            {!isLoading ? (
                                <SendIcon 
                                    color='primary'
                                    style={{cursor: 'pointer'}}
                                    onClick={handleSend}    
                                />
                            ) : (
                                <Typography variant='body2' style={{color: 'gray'}}>
                                    ...Sending
                                </Typography>
                            )}
                        </div>
                        }
                    </InputAdornment>
                }
                placeholder="Send message"
                style={{backgroundColor: '', borderRadius: '5px'}}
                value={chatMsg}
            />
        </FormControl>   

  )
}

export default ChatField