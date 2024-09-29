export const schema = gql`
  type Reminder {
    id: Int!
    date: String!
    time: String!
    patient: Patient!
    patientId: Int!
    task: Task!
    taskId: Int!
    instructions: String!
  }

  type Query {
    reminders: [Reminder!]! @requireAuth
    reminder(id: Int!): Reminder @requireAuth
  }

  input CreateReminderInput {
    date: String!
    time: String!
    patientId: Int!
    taskId: Int!
    instructions: String!
  }

  input UpdateReminderInput {
    date: String
    time: String
    patientId: Int
    taskId: Int
    instructions: String
  }

  type Mutation {
    createReminder(input: CreateReminderInput!): Reminder! @requireAuth
    updateReminder(id: Int!, input: UpdateReminderInput!): Reminder!
      @requireAuth
    deleteReminder(id: Int!): Reminder! @requireAuth
  }
`
