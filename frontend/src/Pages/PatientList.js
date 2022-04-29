import React, { useContext, useEffect, useState } from 'react'
import api from '../utils/api';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../utils/TokenContext';
import { CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';

const headerSx = {
  fontWeight: 700
}

function PatientList() {
  const navigate = useNavigate();
  const [token] = useContext(TokenContext);
  const [failedAuth, setFailedAuth] = useState(false);
  const [patientData, setPatientData] = useState([]);

  const fetchPatients = async() => {
    try{
      const headers = {
        'authorization': token
      }
      const res = await api.get('/patient/list', {headers})
      res.data.sort((a, b) => a.lastName.localeCompare(b.lastName, 'en', { sensitivity: 'base' }))
      setPatientData(res.data)
    }
    catch(err){
      if(err.response.status === 401){
        setFailedAuth(true);
      }
      else{
        console.log(err)
      }
    }
  }

  useEffect(() => {
    fetchPatients();
  },[])

  // loading/unauthorized render
  if(!patientData.length){
    return (
      <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
        {!failedAuth? 
          <CircularProgress/>
          :
          <Typography variant='p'>
            Unauthorized. Please log in to continue.
          </Typography>
        }
      </Box>
    )
  }

  return (
    <TableContainer component={Paper} sx={{ mx:'auto', width: '95%', border: '1px solid rgba(0,0,0,.2)' }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={headerSx}>Patient</TableCell>
            <TableCell sx={headerSx}>Gender</TableCell>
            <TableCell sx={headerSx}>DOB</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patientData.map((patient, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': {cursor: 'pointer', backgroundColor:'rgba(0,0,0,.1)'} }}
                onClick={() => {navigate('/patient/' + patient.patientId)}}
              >
                <TableCell component="th" scope="row">
                  {patient.lastName}{`, `}{patient.firstName}
                </TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.dateOfBirth}</TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PatientList


