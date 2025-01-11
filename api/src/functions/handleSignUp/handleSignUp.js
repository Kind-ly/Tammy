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
  let role = user.app_metadata?.roles ? user.app_metadata?.roles[0] : ''
  // console.log('role')
  // console.log(role)
  try {
    newUser = await createUser({
      input: {
        role,
        email: user.email,
        name: user.user_metadata.full_name,
        phoneNumber: '',
      },
    })
    // console.log('newUser function')
    return newUser
  } catch (e) {
    signUpErrorHandler(e)
  }
}

// This is NOT called locally...
export const handler = async (event, _context) => {
  logger.info(`${event.httpMethod} ${event.path}: handleSignUp function`)
  const data = JSON.parse(event.body)
  const { user } = data
  const eventData = data.event
  let newUser = {}

  // console.log('user data')
  // console.log(user)

  if (eventData == 'signup') {
    // console.log('signup')
    // console.log('creating new user')
    newUser = await register(user)
  }

  if (eventData === 'login') {
    // console.log('login')
    let existingUser = await getUserByEmail({ email: user.email })
    // console.log('existing user')
    // console.log(existingUser)
    if (existingUser == null) {
      // console.log('creating new user')
      newUser = await register(user)
    } else newUser = existingUser
  }

  // console.log('new user')
  // console.log(newUser)

  const responseBody = {
    app_metadata: {
      roles: user.app_metadata?.roles,
    },
    user_metadata: {
      ...user.user_metadata,
      userID: newUser?.id,
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
