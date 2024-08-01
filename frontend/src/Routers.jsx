import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home.jsx' // Assuming App is defined in a separate file
import SignupForm from './Components/Signupform.jsx'; // Import SignupForm using default export
import LoginForm from './Components/Loginform.jsx';
 const Routers = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/signup' element={<SignupForm/>}/>
          <Route path='/login' element={<LoginForm/>}/>
          {/* Add your routes here */}
        </Routes>
      </Router>
    </>
  )
}
export default Routers;