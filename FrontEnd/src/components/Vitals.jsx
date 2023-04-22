// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Table, Button, Alert } from 'react-bootstrap';
import { GET_VITALS, DELETE_VITALS } from '../graphqls/VitalsMutaQueries.js';

const VitalsData = () => {
  const [query, setQuery] = useState('');
  const { data, error, refetch } = useQuery(GET_VITALS);
  const [deleteVitals] = useMutation(DELETE_VITALS);
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push('/login');
    }
  }, [history]);

  if (error) return <Alert variant='danger'>Error fetching data</Alert>;

  const vitals = data ? data.allVitals : [];

  return (
    <div className='AppList'>
      {/* Search and Add Vitals Button */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1 style={{ marginRight: '1rem' }}>Search</h1>
        <input
          type='text'
          placeholder='Search Here...'
          onChange={(e) => setQuery(e.target.value)}
        ></input>
      </div>
      <div>
        <h1>Vitals List</h1>
        <Button as={Link} to='/add' variant='success'>
          Add Vitals
        </Button>
      </div>
      {/* Vitals Table */}
      <Table hover>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Body Temp</th>
            <th>Heart Rate</th>
            <th>Blood Pressure</th>
            <th>Date Captured</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {vitals
            .filter((value) => {
              if (query === '') {
                return true;
              } else if (
                value.patient.firstName
                  .toLowerCase()
                  .includes(query.toLowerCase()) ||
                value.patient.lastName
                  .toLowerCase()
                  .includes(query.toLowerCase()) ||
                value.bodyTemp.toString().includes(query.toLowerCase()) ||
                value.heartRate.toString().includes(query.toLowerCase()) ||
                value.bloodPressure
                  .toLowerCase()
                  .includes(query.toLowerCase()) ||
                value.dateCaptured.toLowerCase().includes(query.toLowerCase())
              ) {
                return true;
              }
              return false;
            })
            .map((vital) => (
              <tr key={vital.id}>
                <td>{`${vital.patient.firstName} ${vital.patient.lastName}`}</td>
                <td>{vital.bodyTemp}</td>
                <td>{vital.heartRate}</td>
                <td>{vital.bloodPressure}</td>
                <td>{vital.dateCaptured}</td>
                <td>
                  <Button
                    variant='danger'
                    onClick={async () => {
                      if (
                        window.confirm(
                          'You are about to delete a vitals record. Are you sure?'
                        )
                      ) {
                        try {
                          await deleteVitals({
                            variables: { id: vital.id },
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
                    to={`/update/${vital.id}`}
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

export default VitalsData;
