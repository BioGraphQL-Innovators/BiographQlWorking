import { gql } from '@apollo/client';

export const GET_PATIENTS = gql`
  query GetPatients {
    getPatients {
      id
      firstName
      lastName
      age
      birthdate
      gender
      address
      mobile
      email
    }
  }
`;

export const CREATE_PATIENT = gql`
  mutation CreatePatient($input: PatientInput!) {
    createPatient(input: $input) {
      id
      firstName
      lastName
      age
      birthdate
      gender
      address
      mobile
      email
    }
  }
`;

export const UPDATE_PATIENT = gql`
  mutation UpdatePatient($id: ID!, $input: PatientInput!) {
    updatePatient(id: $id, input: $input) {
      id
      firstName
      lastName
      age
      birthdate
      gender
      address
      mobile
      email
    }
  }
`;

export const DELETE_PATIENT = gql`
  mutation DeletePatient($id: ID!) {
    deletePatient(id: $id)
  }
`;
