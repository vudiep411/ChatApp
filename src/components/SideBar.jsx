import React, { useState } from 'react'
import { Avatar, Grid, Typography } from '@mui/material'
import SearchBar from './SearchBar'
import '../index.css'
import { useDispatch, useSelector } from 'react-redux'
import { getConversation } from '../actions/firebase'


const SideBar = ({ selectedConvoId, setSelectedConvoId, rooms, setRooms, setMessages }) => {
  const [searchText, setSearchText] = useState('')
  const userProfile = useSelector(state => state.user)
  const dispatch = useDispatch()


  // const filtered = !searchText ? rooms :
  // rooms.filter(
  //   (user) => user
  //   .members
  //   .username
  //   .toString()
  //   .toLowerCase()
  //   .includes(searchText.toLowerCase()))
  const handleSelectedConvo = (convoId) => {
    setSelectedConvoId(convoId)
    dispatch(getConversation(convoId, setMessages))
  }
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
              <SearchBar 
                searchText={searchText} 
                setSearchText={setSearchText} 
                setSelectedConvoId={setSelectedConvoId} 
                setRooms={setRooms} 
                setMessages={setMessages}/>
              { rooms?.map((val) => (
                <div 
                  className={selectedConvoId === val.id ? 'active-person' : 'person'} 
                  key={val.id}
                  onClick={() => handleSelectedConvo(val.id)}
                >
                  {
                    val?.members?.filter(mem => mem.id !== userProfile.id).map(user => 
                      (
                        <div style={{display: 'flex', gap: '15px'}} key={user.id}>
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
                              {val.lastMessage || 'Send message'}
                            </Typography>
                          </div>
                        </div>
                      ))}
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