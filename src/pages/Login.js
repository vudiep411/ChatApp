import { Typography, Button } from '@mui/material'
import { Container } from '@mui/material'
import React from 'react'
import Navbar from '../components/Navbar'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import Background from '../utils/Background';
const Login = () => {
  return (
    <div>
        <Navbar/>
        <Container maxWidth='sm' style={{marginTop: '100px'}}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div style={{textAlign: 'center'}}>
                    {/* Desktop display */}
                    <Typography variant='h2'
                        sx={{
                            display: { xs: 'none', sm: 'block' },                            
                            backgroundImage: 'linear-gradient(to right bottom, rgb(236, 72, 153), rgb(239, 68, 68), rgb(234, 179, 8))',
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}>
                            <b>Message anytime, anywhere</b>
                    </Typography>
                    {/* Mobile display */}
                    <Typography variant='h4'
                        sx={{
                            display: { xs: 'block', sm: 'none' },                            
                            backgroundImage: 'linear-gradient(to right bottom, rgb(236, 72, 153), rgb(239, 68, 68), rgb(234, 179, 8))',
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}>
                            <b>Message anytime, anywhere</b>
                    </Typography><br/>                    
                    <Typography style={{fontSize: '20px', color: 'gray'}}>Stay connected with your friends, family and loved ones. Sign up now for free!</Typography>
                    <br/>
                    <div style={{marginTop: '50px'}}>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Button variant='outlined' 
                                sx={{ color: 'gray', 
                                    backgroundColor: 'white', 
                                    borderColor: 'gray',
                                    '&:hover': {
                                        backgroundColor: '#F5FFFA',
                                        borderColor: 'gray'                                     
                                    }
                                    }}>
                                        <GoogleIcon style={{color: 'red'}}/>&nbsp;&nbsp;Sign in with Google
                            </Button>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                            <Button variant='contained' sx={{ color: 'white', backgroundColor: '#3b5998'}}><FacebookIcon/>&nbsp;&nbsp;Sign in with Facebook</Button>
                        </div>
                    </div>
                </div>            
            </div>
        </Container>
        <div>
            <Background/>
        </div>
    </div>
  )
}

export default Login