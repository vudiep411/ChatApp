import React from 'react'
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const ChatField = ({ chatMsg, setChatMsg }) => {

    const handleSend = () => {
        setChatMsg('')
        console.log("sent")
    }

  return (
    <div style={{position: 'absolute', bottom: '10px', left: '370px', width: '55vw'}}>
        <FormControl fullWidth >
            <OutlinedInput
                size="small"
                id="outlined-adornment-amount"
                onChange={(e) => {setChatMsg(e.target.value)}}
                startAdornment={
                    <InputAdornment position="start" >
                        <AddCircleIcon style={{cursor: 'pointer'}}/>
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
    </div>

  )
}

export default ChatField