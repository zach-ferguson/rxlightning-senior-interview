import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png'
import LoginLogout from './LoginLogout';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1,}}>
      <AppBar position="static" 
        sx={{ background: 'white', padding: '.5rem', boxShadow: 'none' }}>
        <Toolbar>
          <Box
            component="img"
            sx={{
              width: 'fit-content',
              height: 'fit-content',
              maxHeight: { xs: 100, md: 167 },
              maxWidth: { xs: 250, md: 250 },
              mx: {xs: 'auto', md: '1rem'},
              my: {xs: '1rem', md: '2rem'},
              '&:hover': {
                cursor: 'pointer'
              }
            }}
            alt="logo"
            src={logo}
            onClick={()=> { navigate('/') }}
          />
          <Box sx={{display: {xs: 'none', md: 'inline'}, ml: 'auto' }}>
            <LoginLogout color="primary.main"/>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}