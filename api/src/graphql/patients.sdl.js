export const schema = gql`
  type Patient {
    id: String!
    name: String!
    patientInfo: String
    timezone: String!
    careGivers: [CareGiver]!
    tasks: [Task]!
  }

  type Query {
    patients: [Patient!]! @requireAuth
    patient(id: String!): Patient @requireAuth
  }

  input CreatePatientInput {
    name: String!
    patientInfo: String
    timezone: String!
  }

  input UpdatePatientInput {
    name: String
    patientInfo: String
    timezone: String
  }

  type Mutation {
    createPatient(input: CreatePatientInput!): Patient! @requireAuth
    updatePatient(id: String!, input: UpdatePatientInput!): Patient!
      @requireAuth
    deletePatient(id: String!): Patient! @requireAuth
  }
`
