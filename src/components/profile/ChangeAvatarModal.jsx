import React, { useState } from 'react'
import { Typography, Button, Box, Avatar} from '@mui/material';
import Modal from '@mui/material/Modal';
import { useMediaQuery } from 'react-responsive';
import { useDispatch, useSelector } from 'react-redux';
import { storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL  } from 'firebase/storage';
import { changeAvatar } from '../../actions/user';

const ChangeAvatarModal = ({open, setOpen}) => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 499px)' })
    const width = isTabletOrMobile ? '300px' : '400px'
    const user = useSelector(state => state.user)
    const [fileUpload, setFileUpload] = useState()
    const [img, setImg] = useState(user.image)
    const dispatch = useDispatch()
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

    // render the uploaded image on Avatar
    const uploadImage = (e) => {
        const selectedImage = e.target.files[0]
        setFileUpload(selectedImage)
        setImg(URL.createObjectURL(selectedImage))
    }

    const handleSend = async () => {
        let url = null

        if(fileUpload) {
            const storageRef = ref(storage, fileUpload.name)
            const uploadTask = uploadBytesResumable(storageRef, fileUpload)
            uploadTask.on('state_changed',
            (snapshot) => { // show progress
                const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 
            },
            (error) => console.log(error))
            await uploadTask
            url = await getDownloadURL(uploadTask.snapshot.ref)
        }
        setFileUpload(null)
        setImg(null)
        dispatch(changeAvatar(user.id, url))
        setOpen(false)
    }

    const handleCancel = () => {
        setOpen(false)
        setImg(user.image)
        setFileUpload(null)
    }
  return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div style={{justifyContent: 'center', display: 'flex'}}>
                    <div>
                        <Typography id="modal-modal-title" variant="h5" style={{marginBottom: '15px'}}>
                            <b>Change Avatar</b>
                        </Typography>
                            <Avatar
                                src={img}
                                sx={{
                                cursor: 'pointer',
                                width: 150,
                                height: 150,
                            }}
                            onClick={() => setOpen(true)}
                            >V</Avatar><br/>
                            <input 
                                onChange={uploadImage}
                                style={{marginBottom: '15px', maxWidth: '177px'}}
                                type='file' 
                                id='add'
                                accept='image/*'   
                            />
                        <div style={{display: 'flex', gap: '10px'}}>
                            <Button 
                                variant="contained" 
                                style={{
                                    backgroundColor: 'green', 
                                    color: 'white',
                                }}
                                onClick={handleSend}
                            >
                                Save
                            </Button>
                            <Button 
                                color='secondary' 
                                variant='contained' 
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </div>                       
                    </div>
                </div>
            </Box>
        </Modal>        
  )
}

export default ChangeAvatarModal