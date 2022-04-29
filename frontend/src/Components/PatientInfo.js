import { Avatar } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Typography from '@mui/material/Typography';

const infoSx = {
  m: '.25rem'
}

function PatientInfo({ patient }) {
  return (
    <Box id='patient-info-root' sx={{ display: 'flex', m: '1.5rem' }}>
      <Avatar id='patient-avatar' sx={{ width: '64px', height: '64px', m: '1rem' }}/>
      <Box id='patient-info' sx={{display: 'flex', flexDirection: 'column', mt: '2rem'}}>
        <Typography variant="h5" sx={{ mb: '.5rem' }}>
          {patient.lastName}{`, `}{patient.firstName}
        </Typography>
        <Typography variant="p" sx={infoSx}>
          {patient.gender}
        </Typography>
        <Typography variant="p" sx={infoSx}>
        DOB: {patient.dateOfBirth}
        </Typography>
        <Typography variant="p" sx={infoSx}>
          {patient.addressLine1} <br/>
          {patient.addressLine2} {patient.addressLine2 && <br/>}
          {[patient.city, patient.state, patient.postalCode].join(", ")}
        </Typography>
      </Box>
    </Box>
  )
}

export default PatientInfo