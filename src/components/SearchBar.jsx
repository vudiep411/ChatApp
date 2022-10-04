import React, { useState } from 'react'
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { createOrSelectChatRoom, getSearchUser } from '../actions/firebase';
import { Typography, Paper, Button } from '@mui/material';
import { Avatar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import '../index.css'
import { useDispatch, useSelector } from 'react-redux';

const SearchBar = ({ setSearchText, searchText, setSelectedConvoId, setMessages, setShowSideBar }) => {
  const [users, setUsers] = useState()
  const userProfile = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleKeydown = async (e) => {
    if(e.key === 'Enter') {
      e.preventDefault()
      await getSearchUser(searchText, setUsers, userProfile.id)
    }
  }

  const handleSearch = async () => {
    await getSearchUser(searchText, setUsers, userProfile.id)  
  }

  const handleAddRoom = async (id) => {
    setUsers(null)
    setSearchText('')
    setShowSideBar(false)
    dispatch(createOrSelectChatRoom(id, userProfile.id, setSelectedConvoId, setMessages))
  }

  const handleCloseSearch = () => {
    setUsers(null)
    setSearchText('')
  }

  return (
    <div style={{ marginBottom: '20px'}}>
        <FormControl fullWidth>
            <OutlinedInput
                size="small"
                id="outlined-adornment-amount"
                onChange={(e) => {setSearchText(e.target.value)}}
                startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
                endAdornment={           
                <InputAdornment position='end' style={{marginTop: '3px'}}>
                  { searchText &&
                  <p 
                    style={{cursor: 'pointer'}}
                    onClick={handleSearch}
                  >
                    <ArrowForwardIcon/>
                  </p>
                  }
                </InputAdornment>}
                placeholder="Search User"
                style={{ borderRadius: '15px'}}
                value={searchText}
                onKeyDown={(e) => handleKeydown(e)}
            />
        </FormControl>
        {users &&
        <Paper style={{padding: '5px'}}>
          <Button 
            style={{color: 'gray'}} 
            onClick={handleCloseSearch}>
            <ArrowBackIcon/>
          </Button>
          { users.map((user) =>
            <div key={user.id} className='person' onClick={() => handleAddRoom(user.id)}>
              <Avatar src={user.data.image}/>
              <Typography style={{marginTop: '7px'}}>{user.data.username}</Typography>
            </div>
          )}
          { users.length === 0 &&
            <Typography 
              variant='body2' 
              style={{
                color: 'gray', 
                textAlign : 'center',
                padding: '10px'
              }}>
                No Result Found
            </Typography>
          }
        </Paper> 
        }   
  </div> 
  )
}

export default SearchBar