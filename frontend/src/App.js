import { Box } from "@mui/system";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import PatientList from "./Pages/PatientList";
import SinglePatient from "./Pages/SinglePatient";
import { TokenContext } from "./utils/TokenContext";

function App() {
  const [token, setToken] = useState(null);

  return (

    // Using a simple, token-only context here. Normally we would have a User context with more info about the user and their settings.
    // Token would also be stored in an http-only cookie to protect from xss.
    // More security measures would be needed as we are working with highly sensitive HIPPA data.

    <TokenContext.Provider value={[token, setToken]}>
      <Box className="App" id='App' sx={{ width: '100%', weight: '100%', overflow: 'hidden' }}>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} /> 
          <Route path='/login' element={<Login/>} />
          <Route path='/patients' element={<PatientList/>} />      
          <Route path='/patient/:patientId' element={<SinglePatient/>} />
        </Routes>
        <Footer/>
      </Box>
    </TokenContext.Provider>
  );
}

export default App;
