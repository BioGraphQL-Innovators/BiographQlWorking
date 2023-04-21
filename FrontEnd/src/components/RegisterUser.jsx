import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { REGISTER_USER } from '../graphlql/mutations';
import {
  Container,
  Form,
  Button,
  DropdownButton,
  Dropdown,
  Alert,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

const RegisterUser = ({ onRegister }) => {
  const navigate = useNavigate();
  const [registerUser] = useMutation(REGISTER_USER);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(null);
      await registerUser({
        variables: { email, password, role },
      });
      onRegister();

      alert('User registered successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      console.log('Error registering user', error);
      if (
        error.networkError &&
        error.networkError.result &&
        error.networkError.result.errors
      ) {
        setError(error.networkError.result.errors[0].message);
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <Container>
      <h2>Register</h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Role</Form.Label>
          <DropdownButton
            id='dropdown-item-button'
            title={role || 'Select a role'}
            onSelect={(eventKey) => setRole(eventKey)}
          >
            <Dropdown.ItemText>Select a role</Dropdown.ItemText>
            <Dropdown.Item eventKey='PATIENT'>Patient</Dropdown.Item>
            <Dropdown.Item eventKey='NURSE'>Nurse</Dropdown.Item>
          </DropdownButton>
        </Form.Group>

        <Button variant='primary' type='submit'>
          Register
        </Button>
      </Form>
    </Container>
  );
};

RegisterUser.propTypes = {
  onRegister: PropTypes.func.isRequired, // Add PropTypes validation
};

export default RegisterUser;
