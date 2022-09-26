import { Typography } from '@mui/material'
import React from 'react'
import './background.css'
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
const Background = () => {
  return (
    <div className='background'>
      <div className='icons-container'>
        <GitHubIcon fontSize='large' className='icon'/>
        <InstagramIcon fontSize='large' className='icon'/>
        <FacebookIcon fontSize='large' className='icon'/>
      </div>
      <Typography fontSize='small' color='white' className='copyright'>&copy; ChatApp 2022 all rights reserved. The Apple and Google Play logos are trademarks of their respective owners.</Typography>
    </div>
  )
}

export default Background