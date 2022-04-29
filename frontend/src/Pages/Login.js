import { Box, TextField, Button, Typography } from '@mui/material'
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import api from '../utils/api';
import { TokenContext } from '../utils/TokenContext';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const Login = () => {
  const [token, setToken] = useContext(TokenContext)
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: 'foobar@example.com',
      password: 'foobar',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      requestLogin(values);
    },
  });

  const requestLogin = async (values) => {
    try{
      const res = await api.post('/login', {
        username: values.email,
        password: values.password
      })
      setToken(res.data);
      setAuthFailed(false);
    }
    catch(err){
      if(err.response.status === 401){
        setAuthFailed(true)
      }
      else console.log(err)
    }
  }

  useEffect(() => {
    if(token != null){
      navigate('/patients')
    }
  },[token, navigate])

  return (
    <Box id='login-root' sx={{display: 'flex', justifyContent: 'center', width: '100%', my: '2rem'}}>
      <Box id='login-form' sx={{ minWidth: '300px', width: '30%', mx: 'auto' }}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            sx={{ my: '1rem' }}
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            sx={{ my: '1rem' }}
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button 
            color="primary" 
            variant="contained" 
            fullWidth 
            type="submit"
            sx={{ my: '1rem' }}
            >
            Submit
          </Button> 
          {authFailed && (
            <>
              <Typography variant='p' sx={{ color: 'red' }}>
                Incorrect username or password.
              </Typography>
              <br/><br/>
              <Typography variant='p' sx={{ color: 'rgba(0,0,0,.5)', fontSize: '14px', mt: '1rem'}}>
                {`Try 'z.h.ferguson@gmail.com' & 'redbanana' :)`}
              </Typography>
            </>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default Login