export const schema = gql`
  type Task {
    id: Int!
    date: String!
    time: String!
    description: String!
    instructions: String
    patient: Patient!
    patientId: Int!
    action: Action
    reminder: Reminder
  }

  type Query {
    tasks: [Task!]! @requireAuth
    task(id: Int!): Task @requireAuth
    tasksForPatientOnDate(id: Int!, date: String!): [Task!] @skipAuth
  }

  input CreateTaskInput {
    date: String!
    time: String!
    description: String!
    instructions: String
    patientId: Int!
  }

  input UpdateTaskInput {
    date: String
    time: String
    description: String
    instructions: String
    patientId: Int
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task! @requireAuth
    updateTask(id: Int!, input: UpdateTaskInput!): Task! @requireAuth
    deleteTask(id: Int!): Task! @requireAuth
  }
`
