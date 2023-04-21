import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!, $role: UserRole!) {
    registerUser(input: { email: $email, password: $password, role: $role }) {
      id
      email
      role
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
        email
        role
      }
    }
  }
`;
