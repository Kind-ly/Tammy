export const schema = gql`
  type Patient {
    id: Int!
    name: String!
    patientInfo: String
    timezone: String!
    careGivers: [CareGiver]!
    tasks: [Task]!
    actions: [Action]!
    reminders: [Reminder]!
  }

  type Query {
    patients: [Patient!]! @requireAuth
    patient(id: Int!): Patient @requireAuth
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
    updatePatient(id: Int!, input: UpdatePatientInput!): Patient! @requireAuth
    deletePatient(id: Int!): Patient! @requireAuth
  }
`
