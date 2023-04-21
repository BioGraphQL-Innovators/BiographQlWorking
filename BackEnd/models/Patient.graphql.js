import { gql } from 'apollo-server-express';

const Patient = gql`
  type Patient {
    id: ID!
    firstName: String!
    lastName: String!
    age: Int!
    birthdate: String!
    gender: String!
    address: String!
    mobile: String!
    email: String!
  }

  input PatientInput {
    firstName: String!
    lastName: String!
    age: Int!
    birthdate: String!
    gender: String!
    address: String!
    mobile: String!
    email: String!
  }

  extend type Query {
    getPatients: [Patient]
    getPatient(id: ID!): Patient
  }

  extend type Mutation {
    createPatient(input: PatientInput!): Patient
    updatePatient(id: ID!, input: PatientInput!): Patient
    deletePatient(id: ID!): String
  }
`;

export default Patient;
