import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { createUser, getUserByEmail } from 'src/services/users/users'

const signUpErrorHandler = (e) => {
  console.log(e)
  // switch(e.code){
  // case 'P2002'
  // return { code: '  ' }
  // }
}

const register = async (user) => {
  let newUser = {}
  try {
    newUser = await createUser({
      input: {
        role: user.role,
        email: user.email,
        name: user.user_metadata.full_name,
      },
    })
    db.disconnect()
    return newUser
  } catch (e) {
    signUpErrorHandler(e)
  }
}

export const handler = async (event, _context) => {
  logger.info(`${event.httpMethod} ${event.path}: handleSignUp function`)
  const data = JSON.parse(event.body)
  const { user } = data
  const eventData = data.event
  let newUser = {}

  if (eventData == 'signup') {
    newUser = await register(user)
  }

  if (eventData === 'login') {
    //TO DO
    // check if user exists on database
    // if not create a user on database
    //  check if user data matches netlify data
    // if not update user data on data base
    let existingUser = await getUserByEmail({ email: user.email })
    if (!existingUser) newUser = await register(user)
  }

  const responseBody = {
    app_metadata: {
      roles: [newUser.role],
    },
    user_metadata: {
      ...user.user_metadata,
      userID: newUser.id,
    },
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(responseBody),
  }
}
