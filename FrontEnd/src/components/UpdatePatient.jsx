// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { Form, Button, Alert } from 'react-bootstrap';
import { GET_PATIENT, UPDATE_PATIENT } from '../graphqls/queries';

const UpdatePatient = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    gender: '',
    address: '',
    mobile: '',
    email: '',
  });
  const [error, setError] = useState('');
  const {
    data,
    loading,
    error: queryError,
  } = useQuery(GET_PATIENT, {
    variables: { id },
  });
  const [updatePatient] = useMutation(UPDATE_PATIENT);
  const history = useHistory();

  useEffect(() => {
    if (data && data.getPatient) {
      setFormData(data.getPatient);
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const input = {
      ...formData,
      id: undefined, // Also remove the 'id' field from the input object
    };
    delete input.__typename;

    try {
      await updatePatient({ variables: { id, input } });
      history.push('/patientdata');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (queryError) return <Alert variant='danger'>Error fetching data</Alert>;

  return (
    <div>
      <h1>Update Patient</h1>
      {error && <Alert variant='danger'>{error.message}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='firstName'>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type='text'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId='lastName'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type='text'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId='birthdate'>
          <Form.Label>Birthdate</Form.Label>
          <Form.Control
            type='date'
            name='birthdate'
            value={formData.birthdate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId='gender'>
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as='select'
            name='gender'
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value=''>Select Gender</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='Other'>Other</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            name='address'
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId='mobile'>
          <Form.Label>Mobile</Form.Label>
          <Form.Control
            type='text'
            name='mobile'
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Update Patient
        </Button>
      </Form>
    </div>
  );
};

export default UpdatePatient;
