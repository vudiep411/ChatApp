import React from 'react'
import { Typography, Button, Box, TextField} from '@mui/material';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase';

const ChangeUserName = () => {    
    const user = useSelector(state => state.user)
    const [open, setOpen] = React.useState(false);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 499px)' })
    const width = isTabletOrMobile ? '300px' : '500px'
    const dispatch = useDispatch()
    const usernameRef = useRef()

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false)
    };

    const handleSubmit = async () => {
        await updateDoc(doc(db, 'users', user.id), {
            "data.username": usernameRef.current.value
        })
        dispatch({type: 'CHANGE_USERNAME', payload: usernameRef.current.value})
        setOpen(false)
    }
    const style = {
        position: 'absolute',
        width: width,
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'white',
        boxShadow: 24,
        p: 3,
        borderRadius: '5px',
    };
  return (
    <div>
        <Button 
            style={{textTransform: 'none'}}
            variant='contained' 
            color='inherit'
            onClick={handleOpen}
        >
            Change username
        </Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div style={{justifyContent: 'center', display: 'flex'}}>
                    <Typography id="modal-modal-title" variant="h5" style={{marginBottom: '15px'}}>
                        <b>Change username</b>
                    </Typography>
                </div>
                <div>
                    <Typography variant="h6">username:</Typography>
                    <TextField
                        defaultValue={user.username}
                        inputRef={usernameRef} 
                        variant='outlined' 
                        fullWidth
                        style={{marginBottom: '15px'}}
                    />
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', gap: '15px'}}>
                    <Button variant="contained" onClick={handleSubmit} style={{backgroundColor: 'green', color: 'white'}}>Save</Button>
                    <Button color='secondary' variant='contained' onClick={handleClose}>Cancel</Button>
                </div>
            </Box>
        </Modal>        
    </div>
  )
}

export default ChangeUserName