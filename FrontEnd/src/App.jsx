// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import RegisterUser from './components/RegisterUser';
import LoginUser from './components/LoginUser';
import PatientData from './components/PatientData';
import Home from './components/Home';
import Vitals from './components/Vitals';
import Motivate from './components/Motivate';
import Checkup from './components/Checkup';
import AddPatient from './components/AddPatient';
import UpdatePatient from './components/UpdatePatient';
import Game from './components/Game';
import PatientView from './components/PatientView';
import FitnessInfo from './components/FitnessInfo';
import CovidCheck from './components/CovidCheck';
import AuthContext from './AuthContext';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userRole, setUserRole] = useState(null);

  const handleUserRoleChange = (newRole) => {
    setUserRole(newRole);
  };
  const { isLoggedIn, userRole, setIsLoggedIn, setUserRole } =
    useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setUserRole(null);
  };

  return (
    <Router>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='/'>HealthPilot</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/'>
              Home
            </Nav.Link>
            {isLoggedIn && userRole === 'NURSE' && (
              <>
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
              </>
            )}
            {isLoggedIn && userRole === 'PATIENT' && (
              <>
                <Nav.Link as={Link} to='/patientview'>
                  Patient
                </Nav.Link>
                <Nav.Link as={Link} to='/game'>
                  Game
                </Nav.Link>
                <Nav.Link as={Link} to='/motivate'>
                  Motivate
                </Nav.Link>
                <Nav.Link as={Link} to='/Covid Check'>
                  Assessment
                </Nav.Link>
              </>
            )}
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
        <Switch>
          <Route exact path='/' component={Home} />
          <Route
            path='/register'
            render={() => (
              <RegisterUser onRegister={() => setIsLoggedIn(true)} />
            )}
          />
          <Route
            path='/login'
            render={(props) => (
              <LoginUser
                {...props}
                onUserRoleChange={handleUserRoleChange}
                forceUpdate={handleUserRoleChange}
              />
            )}
          />
          {isLoggedIn && userRole === 'NURSE' && (
            <>
              <Route path='/patientdata' component={PatientData} />
              <Route path='/vitals' component={Vitals} />
              <Route path='/motivate' component={Motivate} />
              <Route path='/checkup' component={Checkup} />
              <Route path='/addpatient' component={AddPatient} />
              <Route path='/updatepatient/:id' component={UpdatePatient} />
            </>
          )}
          {isLoggedIn && userRole === 'PATIENT' && (
            <>
              <Route path='/patientview' component={PatientView} />
              <Route path='/game' component={Game} />
              <Route path='/motivate' component={Motivate} />
              <Route path='/Covid Check' component={CovidCheck} />
              <Route path='/fitness' component={FitnessInfo} />
            </>
          )}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
