// eslint-disable-next-line no-unused-vars
import React from 'react';
import nurseImage from '../assets/nurse1.jpg';
import { Container, Image } from 'react-bootstrap';

function Home() {
  return (
    <Container className='text-center'>
      <h1>Welcome to HealthPilot</h1>
      <p>
        We are dedicated to providing the best healthcare services to our
        patients.
      </p>
      <Image src={nurseImage} alt='Nurse' fluid rounded className='shadow' />
    </Container>
  );
}

export default Home;
