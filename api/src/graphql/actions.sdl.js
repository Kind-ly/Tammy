export const schema = gql`
  type Action {
    id: Int!
    patient: Patient!
    patientId: Int!
    task: Task!
    taskId: Int!
    details: String!
    date: String!
    time: String!
  }

  type Query {
    actions: [Action!]! @requireAuth
    action(id: Int!): Action @requireAuth
  }

  input CreateActionInput {
    patientId: Int!
    taskId: Int!
    details: String!
    date: String!
    time: String!
  }

  input UpdateActionInput {
    patientId: Int
    taskId: Int
    details: String
    date: String
    time: String
  }

  type Mutation {
    createAction(input: CreateActionInput!): Action! @requireAuth
    updateAction(id: Int!, input: UpdateActionInput!): Action! @requireAuth
    deleteAction(id: Int!): Action! @requireAuth
  }
`
