import React from 'react'
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';

const ChatField = ({ chatMsg, setChatMsg }) => {

    const handleSend = () => {
        setChatMsg('')
        console.log(chatMsg)
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