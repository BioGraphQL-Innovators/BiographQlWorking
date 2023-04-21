// eslint-disable-next-line no-unused-vars
import React from 'react';
import nurseImage from '../assets/nurse.gif';
import { Container, Image } from 'react-bootstrap';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Table, Button, Alert } from 'react-bootstrap';
function Checkup() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Container className='text-center'>
      <h1>Patient Checkup</h1>
      <p>
        We are dedicated to providing the best healthcare services to our
        patients.
      </p>
      <Image src={nurseImage} alt='Nurse' fluid rounded className='shadow' />
    </Container>
  );
}

export default Checkup;
