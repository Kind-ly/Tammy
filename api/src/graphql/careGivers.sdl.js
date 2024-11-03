export const schema = gql`
  type CareGiver {
    id: String!
    email: String!
    name: String!
    patients: [Patient]!
    devices: [Device]!
  }

  type Query {
    careGivers: [CareGiver!]! @requireAuth
    careGiver(id: String!): CareGiver @requireAuth
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
    updateCareGiver(id: String!, input: UpdateCareGiverInput!): CareGiver!
      @requireAuth
    deleteCareGiver(id: String!): CareGiver! @requireAuth
  }
`
