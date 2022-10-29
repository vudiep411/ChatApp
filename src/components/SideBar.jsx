import React, { useState } from 'react'
import { Avatar, Grid, Typography } from '@mui/material'
import SearchBar from './SearchBar'
import '../index.css'
import { useDispatch, useSelector } from 'react-redux'
import { getConversation } from '../actions/firebase'
import moment from 'moment/moment'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const SideBar = ({  setMessages, setShowSideBar }) => {
  const [searchText, setSearchText] = useState('')
  const userProfile = useSelector(state => state.user)
  const selectedConvoId = useSelector(state => state.selectedConvo)
  const dispatch = useDispatch()

  const rooms = useSelector(state => state.rooms)
  const filtered = !searchText ? rooms :
  rooms.filter(
    (room) => room
    .members.every(member => 
      member
      .username
      .toString()
      .toLowerCase()
      .includes(searchText.toLowerCase()))
    )

  const handleSelectedConvo = (convoId) => {
    dispatch({type: 'SET_CONVO', payload: convoId})
    setShowSideBar(false)
    dispatch(getConversation(convoId, setMessages))
  }
  return (
    <Grid>
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
                setMessages={setMessages}
                setShowSideBar={setShowSideBar}
              />
              { filtered?.map((val) => (
                <div 
                  className={selectedConvoId === val.id ? 'active-person' : 'person'} 
                  key={val.id}
                  onClick={() => handleSelectedConvo(val.id)}
                >
                  {
                    val?.members?.map(user => 
                      (
                        <div style={{display: 'flex', gap: '15px', width: '80%'}} key={user.id}>
                          <Avatar sx={{width: 50, height: 50}} src={user.image}></Avatar>
                          <div>
                            {(val?.read || val.lastSender === userProfile.id) ? (
                              <Typography 
                                style={{
                                overflow: 'hidden', 
                                textOverflow: "ellipsis", 
                                whiteSpace: 'nowrap', 
                                maxWidth: '250px'}}>
                                  {user.username}
                              </Typography>
                            ) : (
                              <Typography 
                                style={{
                                overflow: 'hidden', 
                                textOverflow: "ellipsis", 
                                whiteSpace: 'nowrap', 
                                maxWidth: '250px'}}>
                                  <b>{user.username}</b>
                              </Typography>
                            )}
                            { val.lastSender === userProfile.id ? 
                            (
                              <Typography variant='body2' color='GrayText' style={{overflow: 'hidden', textOverflow: "ellipsis", whiteSpace: 'nowrap', maxWidth: '250px'}}>
                                {(`You: ` + val.lastMessage) || 'Send message'}
                              </Typography>
                            ) : (
                            <div>
                              { val?.read ? (
                                <Typography variant='body2' color='GrayText' style={{overflow: 'hidden', textOverflow: "ellipsis", whiteSpace: 'nowrap', maxWidth: '250px'}}>
                                  {val.lastMessage || 'Send message'}
                                </Typography>
                              ) : (
                                <div style={{display: 'flex'}}>
                                  <Typography variant='body2' style={{overflow: 'hidden', textOverflow: "ellipsis", whiteSpace: 'nowrap', maxWidth: '250px'}}>
                                    <b>{val.lastMessage || 'Send message'}</b>
                                  </Typography>                              
                                </div>
                              )}
                            </div>)
                            }
                          </div>
                        </div>                      
                  ))}
                  <div style={{width: '100%', textAlign: 'end'}}>
                  <Typography variant='body2' fontSize={12} color='GrayText'>{moment(new Date(val.date.seconds * 1000).toISOString()).fromNow(true)}</Typography>
                    { !val?.read && val.lastSender !== userProfile.id &&
                      <FiberManualRecordIcon fontSize='small' color='primary'/>
                    }
                  </div>
              </div>
              )
            )}
            </div>
        </div>
    </Grid>
  )
}

export default SideBar