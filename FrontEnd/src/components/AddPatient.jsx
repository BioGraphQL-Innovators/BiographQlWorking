import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { CREATE_PATIENT, GET_PATIENTS } from '../graphqls/queries';

const AddPatient = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    gender: '',
    address: '',
    mobile: '',
    email: '',
  });

  const [createPatient, { error }] = useMutation(CREATE_PATIENT, {
    update(cache, { data: { createPatient } }) {
      const { getPatients } = cache.readQuery({ query: GET_PATIENTS });
      cache.writeQuery({
        query: GET_PATIENTS,
        data: { getPatients: getPatients.concat([createPatient]) },
      });
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === 'birthdate') {
      const age = calculateAge(e.target.value);
      setFormData({ ...formData, [e.target.name]: e.target.value, age });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createPatient({ variables: { input: formData } });
      history.push('/patientdata');
    } catch (err) {
      // Handle any errors
      console.error('Error while adding patient:', err);
    }
  };

  const calculateAge = (birthdate) => {
    const birthDateObj = new Date(birthdate);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDateObj.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && currentDate.getDate() < birthDateObj.getDate())
    ) {
      return age - 1;
    }
    return age;
  };

  return (
    <div>
      <h1>Add Patient</h1>
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
          Add Patient
        </Button>
      </Form>
    </div>
  );
};

export default AddPatient;
