export const schema = gql`
  type Device {
    id: Int!
    User: User
    userId: String
  }

  type Query {
    devices: [Device!]! @requireAuth
    device(id: Int!): Device @requireAuth
  }

  input UpdateDeviceInput {
    id: Int
    userId: String
  }

  type Mutation {
    createDevice(id: Int!): Device! @requireAuth
    updateDevice(id: Int!, input: UpdateDeviceInput!): Device! @requireAuth
    deleteDevice(id: Int!): Device! @requireAuth
  }
`
