import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button, Alert } from 'react-bootstrap';
import { GET_PATIENTS, DELETE_PATIENT } from '../graphlql/queries';

const PatientData = () => {
  const [query, setQuery] = useState('');
  const { data, error, refetch } = useQuery(GET_PATIENTS);
  // const [addPatient] = useMutation(CREATE_PATIENT);
  // const [updatePatient] = useMutation(UPDATE_PATIENT);
  const [deletePatient] = useMutation(DELETE_PATIENT);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  if (error) return <Alert variant='danger'>Error fetching data</Alert>;

  const patients = data ? data.getPatients : [];

  return (
    <div className='AppList'>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1 style={{ marginRight: '1rem' }}>Search</h1>
        <input
          type='text'
          placeholder='Search Here...'
          onChange={(e) => setQuery(e.target.value)}
        ></input>
      </div>
      <div></div>
      <div>
        <h1>Patient List</h1>
        <Button as={Link} to='/add' variant='success'>
          Add Patient
        </Button>
      </div>
      <Table hover>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Birthdate</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Mobile</th>
            <th>Email</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {patients
            .filter((value) => {
              if (query === '') {
                return true;
              } else if (
                value.firstName.toLowerCase().includes(query.toLowerCase()) ||
                value.lastName.toLowerCase().includes(query.toLowerCase()) ||
                value.age.toString().includes(query.toLowerCase()) ||
                value.birthdate.toLowerCase().includes(query.toLowerCase()) ||
                value.gender.toLowerCase().includes(query.toLowerCase()) ||
                value.address.toLowerCase().includes(query.toLowerCase()) ||
                value.mobile.toLowerCase().includes(query.toLowerCase()) ||
                value.email.toLowerCase().includes(query.toLowerCase())
              ) {
                return true;
              }
              return false;
            })
            .map((patient) => (
              <tr key={patient.id}>
                {/* <td>{patient.id}</td> */}
                <td>{patient.firstName}</td>
                <td>{patient.lastName}</td>
                <td>{patient.age}</td>
                <td>{patient.birthdate}</td>
                <td>{patient.gender}</td>
                <td>{patient.address}</td>
                <td>{patient.mobile}</td>
                <td>{patient.email}</td>
                <td>
                  <Button
                    variant='danger'
                    onClick={async () => {
                      if (
                        window.confirm(
                          'You are about to delete a patient record. Are you sure?'
                        )
                      ) {
                        try {
                          await deletePatient({
                            variables: { id: patient.id },
                          });
                          refetch();
                        } catch (error) {
                          console.log(error);
                        }
                      }
                    }}
                  >
                    Delete
                  </Button>
                </td>
                <td>
                  <Button
                    as={Link}
                    to={`/update/${patient.id}`}
                    variant='primary'
                  >
                    Update
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PatientData;
