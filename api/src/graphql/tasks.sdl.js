export const schema = gql`
  enum TaskStatus {
    TODO
    COMPLETED
    UNCERTAIN
  }

  type Task {
    id: String!
    date: String!
    time: String!
    description: String!
    instructions: String
    status: TaskStatus
    timeCompleted: String
    parentTask: String
    patient: Patient!
    patientId: String!
  }

  type Query {
    tasks: [Task!]! @requireAuth
    task(id: String!): Task @requireAuth
    tasksForPatient(id: String!): [Task!] @skipAuth
    tasksForPatientOnDate(id: String!, date: String!): [Task!] @skipAuth
  }

  input CreateTaskInput {
    date: String!
    time: String!
    description: String!
    instructions: String
    parentTask: String
    patientId: String!
  }

  input UpdateTaskInput {
    date: String
    time: String
    description: String
    instructions: String
    status: TaskStatus
    timeCompleted: String
    patientId: String
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task! @requireAuth
    updateTask(id: String!, input: UpdateTaskInput!): Task! @requireAuth
    deleteTask(id: String!): Task! @requireAuth
  }
`
