import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();

  return (
    <Box id='home-root'
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '100%', 
        minHeight: '100%',
        height: '100%'
      }}>
      <Button variant='contained' sx={{ width: '200px', height: '100px', mt: '10rem' }}
        onClick={() => { navigate('/patients') }}>
        Patient Viewer
      </Button>
    </Box>
  )
}

export default Home