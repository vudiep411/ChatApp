import React, { useState } from 'react'
import { Avatar, Grid, Typography } from '@mui/material'
import SearchBar from './SearchBar'
import '../index.css'

var data = Array.from({length: 20}, (v, i) => i)

const SideBar = () => {
  const [searchText, setSearchText] = useState('')

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
              { data?.map((val) => (
                <div className='person'>
                  <Avatar sx={{width: 50, height: 50}}>V</Avatar>
                  <div>
                    <Typography>Vu Diep</Typography>
                    <Typography variant='body2' color='GrayText' style={{overflow: 'hidden', textOverflow: "ellipsis", whiteSpace: 'nowrap', maxWidth: '250px'}}>Hello asdasdas asd as das dasd as dasasd asd sa sa </Typography>
                  </div>
                </div>
            ))}
            </div>
        </div>

    </Grid>
  )
}

export default SideBar