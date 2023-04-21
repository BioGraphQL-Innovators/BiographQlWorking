/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import RegisterUser from './components/RegisterUser';
import LoginUser from './components/LoginUser';
import PatientData from './components/PatientData';
import Home from './components/Home';
import Vitals from './components/Vitals';
import Motivate from './components/Motivate';
import Checkup from './components/Checkup';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Check token in localStorage with the key 'token'
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='/'>HealthPilot</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/'>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to='/patientdata'>
              Patients
            </Nav.Link>
            <Nav.Link as={Link} to='/vitals'>
              Vitals
            </Nav.Link>
            <Nav.Link as={Link} to='/motivate'>
              Motivate
            </Nav.Link>
            <Nav.Link as={Link} to='/checkup'>
              Checkup
            </Nav.Link>
            {isLoggedIn ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to='/register'>
                  Register
                </Nav.Link>
                <Nav.Link as={Link} to='/login'>
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>

      <div className='container mt-5'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/register'
            element={<RegisterUser onRegister={() => setIsLoggedIn(true)} />}
          />
          <Route
            path='/login'
            element={
              <LoginUser
                onLogin={() => setIsLoggedIn(true)}
                onLogout={handleLogout}
              />
            }
          />
          <Route path='/patientdata' element={<PatientData />} />
          <Route path='/vitals' element={<Vitals />} />
          <Route path='/motivate' element={<Motivate />} />
          <Route path='/checkup' element={<Checkup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
