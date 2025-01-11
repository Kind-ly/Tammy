import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

const Navbar = () => {
  const { isAuthenticated, signUp, logIn, logOut, currentUser } = useAuth()
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
            <div className="flex">
              <button
                className="focus:shadow-outline mb-3 inline-block w-full items-center rounded-lg border border-slate-300 px-3 py-2 text-left text-sm font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-600 focus:bg-slate-100 focus:outline-none md:mb-0 md:w-auto"
                onClick={() => {
                  logOut()
                }}
              >
                Sign out
              </button>
              <Link
                to={routes.careGiver({ id: currentUser.user_metadata?.userID })}
                className="relative ml-3 block h-10 w-10 cursor-pointer rounded-full bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke-width%3D%221.5%22%20stroke%3D%22%23475569%22%20class%3D%22size-6%22%3E%0A%20%20%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M17.982%2018.725A7.488%207.488%200%200%200%2012%2015.75a7.488%207.488%200%200%200-5.982%202.975m11.963%200a9%209%200%201%200-11.963%200m11.963%200A8.966%208.966%200%200%201%2012%2021a8.966%208.966%200%200%201-5.982-2.275M15%209.75a3%203%200%201%201-6%200%203%203%200%200%201%206%200Z%22%20%2F%3E%0A%3C%2Fsvg%3E')] bg-cover bg-center ring-teal-500 hover:ring-4"
              ></Link>
            </div>
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
