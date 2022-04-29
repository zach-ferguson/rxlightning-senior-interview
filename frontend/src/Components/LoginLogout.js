import React, { useContext } from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../utils/TokenContext';

function LoginLogout(props) {
  const [token, setToken] = useContext(TokenContext)
  const navigate = useNavigate();

  return (
    <Button 
      variant={props.variant || 'outlined'}
      color={'primary'}
      onClick={
        token?
          () => {setToken(null); navigate('/login')}
          :
          () => navigate('/login')
      }
      sx={{ 
        m: '.5rem',
        width: '100px', 
        height: '50px', 
        fontSize: '18px',
        backgroundColor: {xs: 'white', md: 'primary.main'},
        color: {xs: 'primary.main', md: 'white'},
      }}>
      {token? 'Logout' : 'Login'}
    </Button> 
  )
}

export default LoginLogout