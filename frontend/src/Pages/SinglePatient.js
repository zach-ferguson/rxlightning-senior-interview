import { Box } from '@mui/system'
import React, { useState, useEffect, useContext } from 'react'
import api from '../utils/api'
import PatientInfo from '../Components/PatientInfo';
import { Button, CircularProgress, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { TokenContext } from '../utils/TokenContext';

function SinglePatient(props) {
  const navigate = useNavigate();
  const [token] = useContext(TokenContext);
  const [failedAuth, setFailedAuth] = useState(false);
  const [patient, setPatient] = useState(null)
  let { patientId } = useParams();

  const fetchPatientData = async() => {
    try{
      const headers = {
        'authorization': token
      }
      const res = await api.get('/patient/' + patientId, {headers})
      setPatient(res.data)
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
    fetchPatientData();
  },[])
  
  // loading/unauthorized render
  if(!patient){
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
    <Box id='single-patient-root'>
      <Button onClick={() => { navigate('/patients') }} sx={{ ml: '2rem' }}>
        <ArrowBack/>
          All Patients
      </Button>
      <PatientInfo patient={patient} />
    </Box>
  )
}

export default SinglePatient