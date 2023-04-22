const User = `
enum UserRole {
    PATIENT
    NURSE
    # Add other roles here if needed
  }
  
  type User {
    id: ID!
    email: String!
    password: String!
    role: UserRole!
    token: String
  }
  
  type AuthPayload {
    token: String!
    user: User!
  }
  
  input UserInput {
    email: String!
    password: String!
  }
  
  input UserRegistrationInput {
    email: String!
    password: String!
    role: UserRole!
  }
  
  type Query {
    getUsers: [User]
    getUser(id: ID!): User
    checkToken: User
  }
  
  type Mutation {
    registerUser(input: UserRegistrationInput!): User
    loginUser(input: UserInput!): AuthPayload!
  }
`;

export default User;
