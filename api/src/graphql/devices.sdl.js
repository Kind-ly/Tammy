export const schema = gql`
  type Device {
    id: Int!
    User: User!
    userId: String!
  }

  type Query {
    devices: [Device!]! @requireAuth
    device(id: Int!): Device @requireAuth
  }

  input CreateDeviceInput {
    id: Int!
    userId: String!
  }

  input UpdateDeviceInput {
    userId: String
  }

  type Mutation {
    createDevice(input: CreateDeviceInput!): Device! @requireAuth
    updateDevice(id: Int!, input: UpdateDeviceInput!): Device! @requireAuth
    deleteDevice(id: Int!): Device! @requireAuth
  }
`
