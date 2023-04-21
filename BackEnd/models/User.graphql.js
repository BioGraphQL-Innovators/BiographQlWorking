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
  
  input UserInput {
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
    registerUser(input: UserInput!): User
    loginUser(input: UserInput!): String
  }
  
`;

export default User;
