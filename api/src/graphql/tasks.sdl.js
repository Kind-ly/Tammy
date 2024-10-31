export const schema = gql`
  enum TaskStatus {
    TODO
    COMPLETED
    UNCERTAIN
  }

  type Task {
    id: Int!
    date: String!
    time: String!
    description: String!
    instructions: String
    status: TaskStatus
    timeCompleted: String
    patient: Patient!
    patientId: Int!
    reminder: Reminder
  }

  type Query {
    tasks: [Task!]! @requireAuth
    task(id: Int!): Task @requireAuth
    tasksForPatient(id: Int!): [Task!] @skipAuth
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
    status: TaskStatus
    timeCompleted: String
    patientId: Int
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task! @requireAuth
    updateTask(id: Int!, input: UpdateTaskInput!): Task! @requireAuth
    deleteTask(id: Int!): Task! @requireAuth
  }
`
