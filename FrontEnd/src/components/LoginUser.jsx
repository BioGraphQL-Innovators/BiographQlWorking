import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphlql/mutations';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginUser = () => {
  const [loginUser] = useMutation(LOGIN_USER);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('email of user: ', email);
    console.log('password of user: ', password);
    const input = { email, password };
    console.log('input object: ', input);
    try {
      setError(null);
      const { data } = await loginUser({ variables: { input } });
      localStorage.setItem('token', data.loginUser);
      navigate('/patientdata');
    } catch (error) {
      console.log('Error logging in user', error);
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <Container>
      <h2>Login</h2>
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

        <Button variant='primary' type='submit'>
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default LoginUser;
