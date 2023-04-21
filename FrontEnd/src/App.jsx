import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import RegisterUser from './components/RegisterUser';
import LoginUser from './components/LoginUser';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
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
          <Route
            path='/register'
            element={<RegisterUser onRegister={() => setIsLoggedIn(true)} />}
          />
          <Route
            path='/login'
            element={<LoginUser onLogin={() => setIsLoggedIn(true)} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
