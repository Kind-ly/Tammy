export const schema = gql`
  type Device {
    id: Int!
    CareGiver: CareGiver!
    careGiverId: Int!
  }

  type Query {
    devices: [Device!]! @requireAuth
    device(id: Int!): Device @requireAuth
  }

  input CreateDeviceInput {
    careGiverId: Int!
  }

  input UpdateDeviceInput {
    careGiverId: Int
  }

  type Mutation {
    createDevice(input: CreateDeviceInput!): Device! @requireAuth
    updateDevice(id: Int!, input: UpdateDeviceInput!): Device! @requireAuth
    deleteDevice(id: Int!): Device! @requireAuth
  }
`
