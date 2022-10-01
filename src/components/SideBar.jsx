import React, { useState } from 'react'
import { Avatar, Grid, Typography } from '@mui/material'
import SearchBar from './SearchBar'
import '../index.css'
import { useSelector } from 'react-redux'


const SideBar = ({ selectedConvoId, setSelectedConvoId }) => {
  const [searchText, setSearchText] = useState('')
  const rooms = useSelector(state => state.chatrooms)
  const userProfile = useSelector(state => state.user)
  // console.log(rooms)

  const filtered = !searchText ? rooms :
  rooms.filter(
    (user) => user
    .username
    .toString()
    .toLowerCase()
    .includes(searchText.toLowerCase()))

  return (
    <Grid sx={{display: {xs : 'none', sm: 'block'}}}>
        <div style={{
            width: '350px', 
            backgroundColor: 'white',
            height: '100vh',
            overflowY: 'scroll',
            top: '0',
            bottom: '0',
            borderRight: '1px solid rgb(208,208,208)'
            }}>
            <div style={{ marginTop: '90px', padding: '10px'}}>
            <SearchBar searchText={searchText} setSearchText={setSearchText} setSelectedConvoId={setSelectedConvoId}/>
              { filtered?.map((val, i) => (
                <div 
                  className={selectedConvoId === val.id ? 'active-person' : 'person'} 
                  key={i}
                  onClick={() => setSelectedConvoId(val.id)}
                >
                  {
                    val.members.filter(mem => mem.id !== userProfile.id).map(user => 
                      (
                        <div style={{display: 'flex', gap: '15px'}} key={i}>
                          <Avatar sx={{width: 50, height: 50}} src={user.image}></Avatar>
                          <div>
                            <Typography 
                              style={{
                              overflow: 'hidden', 
                              textOverflow: "ellipsis", 
                              whiteSpace: 'nowrap', 
                              maxWidth: '250px'}}>
                                {user.username}
                            </Typography>
                            <Typography variant='body2' color='GrayText' style={{overflow: 'hidden', textOverflow: "ellipsis", whiteSpace: 'nowrap', maxWidth: '250px'}}>
                              {val.lastMessage || 'You are now connected'}
                            </Typography>
                          </div>
                        </div>
                      )
                    )
                  }
                  
                <div>
              </div>
            </div>
            ))}
            </div>
        </div>

    </Grid>
  )
}

export default SideBar