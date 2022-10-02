import React from 'react'
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../actions/firebase';

const ChatField = ({ chatMsg, setChatMsg, selectedConvoId, setRooms }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const handleSend = () => {
        setChatMsg('')
        dispatch(sendMessage(selectedConvoId, chatMsg, user, setRooms))
    }

  return (
        <FormControl fullWidth>
            <OutlinedInput
                size="small"
                id="outlined-adornment-amount"
                onChange={(e) => {setChatMsg(e.target.value)}}
                startAdornment={
                    <InputAdornment position="start" >
                        <input 
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
                        {   chatMsg &&
                            <SendIcon 
                                color='primary'
                                style={{cursor: 'pointer'}}
                                onClick={handleSend}    
                            />
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