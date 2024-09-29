export const schema = gql`
  type CareGiver {
    id: Int!
    email: String!
    name: String!
    patients: [Patient]!
    devices: [Device]!
  }

  type Query {
    careGivers: [CareGiver!]! @requireAuth
    careGiver(id: Int!): CareGiver @requireAuth
  }

  input CreateCareGiverInput {
    email: String!
    name: String!
  }

  input UpdateCareGiverInput {
    email: String
    name: String
  }

  type Mutation {
    createCareGiver(input: CreateCareGiverInput!): CareGiver! @requireAuth
    updateCareGiver(id: Int!, input: UpdateCareGiverInput!): CareGiver!
      @requireAuth
    deleteCareGiver(id: Int!): CareGiver! @requireAuth
  }
`
