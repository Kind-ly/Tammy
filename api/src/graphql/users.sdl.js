export const schema = gql`
  type User {
    id: String!
    email: String!
    name: String!
    role: String!
    patients: [Patient]!
    devices: [Device]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    name: String!
    role: String!
  }

  input UpdateUserInput {
    email: String
    name: String
    role: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
  }
`
