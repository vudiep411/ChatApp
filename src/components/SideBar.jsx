import React, { useState } from 'react'
import { Avatar, Grid, Typography } from '@mui/material'
import SearchBar from './SearchBar'
import '../index.css'
import { userMessages } from '../utils/mockdata'

// var data = Array.from({length: 20}, (v, i) => i)
const data = userMessages
const SideBar = () => {
  const [searchText, setSearchText] = useState('')
  const [selectedUid, setSelectedUid] = useState('')

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
              { data?.map((val, i) => (
                <div 
                  className={selectedUid === val.uid ? 'active-person' : 'person'} 
                  key={i}
                  onClick={() => setSelectedUid(val.uid)}
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
                      {val.messages}
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