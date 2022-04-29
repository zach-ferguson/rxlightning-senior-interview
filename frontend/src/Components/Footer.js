import { Box } from '@mui/system'
import React from 'react'
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import LoginLogout from './LoginLogout';

function Footer() {
  return (
    <AppBar 
      position='fixed' 
      sx={{ 
        height: 'fit-content', 
        backgroundColor: 'primary.main', 
        position: 'fixed', 
        top: 'auto', 
        bottom: 0,
        fontSize: '12px',
        display: 'flex',
        flexDirection: 'row'
      }}>
        <Typography variant='p' sx={{ mx: '1rem', my: 'auto', }}>
          Mockup by Zach Ferguson
        </Typography>
        <Box sx={{ display: {md: 'none'}, ml: 'auto'}}>
          <LoginLogout variant="contained"/>
        </Box>
    </AppBar>
  )
}

export default Footer