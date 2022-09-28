import React, { useState } from 'react'
import { Avatar, Grid, Typography } from '@mui/material'
import SearchBar from './SearchBar'
import '../index.css'
import { userMessages } from '../utils/mockdata'

// var data = Array.from({length: 20}, (v, i) => i)
const data = userMessages
const SideBar = ({ selectedConvoId, setSelectedConvoId }) => {
  const [searchText, setSearchText] = useState('')

  const filtered = !searchText ? data :
  data.filter(
    (user) => user.username
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
              <SearchBar searchText={searchText} setSearchText={setSearchText}/>
              { filtered?.map((val, i) => (
                <div 
                  className={selectedConvoId === val._id ? 'active-person' : 'person'} 
                  key={i}
                  onClick={() => setSelectedConvoId(val._id)}
                >
                  <Avatar sx={{width: 50, height: 50}} src={val.image}></Avatar>
                  <div>
                    <Typography 
                      style={{
                        overflow: 'hidden', 
                        textOverflow: "ellipsis", 
                        whiteSpace: 'nowrap', 
                        maxWidth: '250px'}}>
                          {val.username}
                    </Typography>
                    <Typography variant='body2' color='GrayText' style={{overflow: 'hidden', textOverflow: "ellipsis", whiteSpace: 'nowrap', maxWidth: '250px'}}>
                      {val.lastMessage}
                    </Typography>
                  </div>
                </div>
            ))}
            </div>
        </div>

    </Grid>
  )
}

export default SideBar