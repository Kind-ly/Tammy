import { useEffect } from 'react'

import { navigate, routes, useLocation } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import MainLayout from 'src/layouts/MainLayout'

const HomePage = () => {
  const { search } = useLocation()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      if (/redirectTo/.test(search)) {
        const newPath = search.split('=').slice(-1).join()
        navigate(newPath)
      } else {
        navigate(routes.patients())
      }
    }
  }, [isAuthenticated, search])

  return (
    <MainLayout>
      <Metadata title="Home" description="Home page" />

      <h1 className="text-2xl">HomePage</h1>
    </MainLayout>
  )
}

export default HomePage
