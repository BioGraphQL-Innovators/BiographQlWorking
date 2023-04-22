// eslint-disable-next-line no-unused-vars
import React from 'react';
import nurseImage from '../assets/nurse.gif';
import { Container, Image } from 'react-bootstrap';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import { Table, Button, Alert } from 'react-bootstrap';
function Checkup() {
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push('/login');
    }
  }, [history]);

  return (
    <Container className='text-center'>
      <h1>Vital Signs Information</h1>
      <p>
        We are dedicated to providing the best healthcare services to our
        patients.
      </p>
      <Image src={nurseImage} alt='Nurse' fluid rounded className='shadow' />
    </Container>
  );
}

export default Checkup;
