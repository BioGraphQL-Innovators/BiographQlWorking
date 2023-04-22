import { gql } from '@apollo/client';

export const GET_VITALS = gql`
  query GetAllVitals {
    allVitals {
      id
      patient {
        id
        firstName
        lastName
      }
      bodyTemp
      heartRate
      bloodPressure
      dateCaptured
    }
  }
`;

export const DELETE_VITALS = gql`
  mutation DeleteVitals($id: ID!) {
    deleteVitals(id: $id)
  }
`;

export const CREATE_VITALS = gql`
  mutation CreateVitals(
    $patient: ID!
    $bodyTemp: Float!
    $heartRate: Float!
    $bloodPressure: String!
    $dateCaptured: Date!
  ) {
    createVitals(
      patient: $patient
      bodyTemp: $bodyTemp
      heartRate: $heartRate
      bloodPressure: $bloodPressure
      dateCaptured: $dateCaptured
    ) {
      id
    }
  }
`;

export const UPDATE_VITALS = gql`
  mutation UpdateVitals(
    $id: ID!
    $bodyTemp: Float
    $heartRate: Float
    $bloodPressure: String
    $dateCaptured: Date
  ) {
    updateVitals(
      id: $id
      bodyTemp: $bodyTemp
      heartRate: $heartRate
      bloodPressure: $bloodPressure
      dateCaptured: $dateCaptured
    ) {
      id
    }
  }
`;
