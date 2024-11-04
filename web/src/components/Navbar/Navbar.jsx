import { useAuth } from 'src/auth'

const Navbar = () => {
  const { isAuthenticated, currentUser, signUp, logIn, logOut } = useAuth()
  console.log(currentUser)

  return (
    <div className="w-full bg-white text-gray-700">
      <div className="mx-auto flex max-w-screen-xl flex-col px-4 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-between py-4">
          <a
            href="https://kind.ly"
            className="focus:shadow-outline rounded-lg text-lg font-semibold uppercase tracking-widest text-gray-900 focus:outline-none"
          >
            Kindly
          </a>
        </div>
        <div>
          {isAuthenticated ? (
            <>
              <button
                className="focus:shadow-outline mb-3 inline-block w-full items-center rounded-lg border border-slate-300 px-3 py-2 text-left text-sm font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-600 focus:bg-slate-100 focus:outline-none md:mb-0 md:w-auto"
                onClick={() => {
                  logOut()
                }}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <button
                className="focus:shadow-outline mb-3 mr-2 inline-block w-full items-center rounded-lg border border-slate-300 px-3 py-2 text-left text-sm font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-600 focus:bg-slate-100 focus:outline-none md:mb-0 md:w-auto"
                onClick={() => {
                  signUp()
                }}
              >
                Sign up
              </button>
              <button
                className="focus:shadow-outline mb-3 inline-block w-full items-center rounded-lg border border-teal-300 px-3 py-2 text-left text-sm font-semibold text-teal-500 transition-colors hover:bg-teal-100 hover:text-teal-600 focus:bg-teal-100 focus:outline-none md:mb-0 md:w-auto"
                onClick={() => {
                  logIn()
                }}
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
