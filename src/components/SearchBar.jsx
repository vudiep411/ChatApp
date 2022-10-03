import React, { useState } from 'react'
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { createOrSelectChatRoom, getChatRooms, getSearchUser } from '../actions/firebase';
import { Typography, Paper, Button } from '@mui/material';
import { Avatar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../index.css'
import { useSelector } from 'react-redux';

const SearchBar = ({ setSearchText, searchText, setSelectedConvoId, setRooms, setMessages }) => {
  const [users, setUsers] = useState()
  const userProfile = useSelector(state => state.user)

  const handleKeydown = async (e) => {
    if(e.key === 'Enter') {
      e.preventDefault()
      await getSearchUser(searchText, setUsers, userProfile.id)
    }
  }

  const handleAddRoom = async (id) => {
    setUsers(null)
    await createOrSelectChatRoom(id, userProfile.id, setSelectedConvoId, setMessages, setRooms)
  }

  return (
    <div style={{ marginBottom: '20px'}}>
        <FormControl fullWidth>
            <OutlinedInput
                size="small"
                id="outlined-adornment-amount"
                onChange={(e) => {setSearchText(e.target.value)}}
                startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
                placeholder="Search User"
                style={{ borderRadius: '15px'}}
                value={searchText}
                onKeyDown={(e) => handleKeydown(e)}
            />
        </FormControl>
        {users &&
        <Paper style={{padding: '5px'}}>
          <Button style={{color: 'gray'}} onClick={() => setUsers(null)}><ArrowBackIcon/></Button>
          { users.map((user) =>
            <div key={user.id} className='person' onClick={() => handleAddRoom(user.id)}>
              <Avatar src={user.data.image}/>
              <Typography style={{marginTop: '7px'}}>{user.data.username}</Typography>
            </div>
          )}
        </Paper> 
        }   
  </div> 
  )
}

export default SearchBar