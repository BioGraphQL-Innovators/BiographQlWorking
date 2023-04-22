import { gql } from 'apollo-server-express';

export const Vitals = gql`
  scalar Date

  type Vitals {
    id: ID!
    patient: Patient!
    bodyTemp: Float!
    heartRate: Float!
    bloodPressure: String!
    dateCaptured: Date!
  }

  extend type Query {
    vitals(id: ID!): Vitals
    allVitals: [Vitals]
  }

  extend type Mutation {
    createVitals(
      patient: ID!
      bodyTemp: Float!
      heartRate: Float!
      bloodPressure: String!
      dateCaptured: Date!
    ): Vitals!
    updateVitals(
      id: ID!
      bodyTemp: Float
      heartRate: Float
      bloodPressure: String
      dateCaptured: Date
    ): Vitals!
    deleteVitals(id: ID!): Boolean!
  }
`;
