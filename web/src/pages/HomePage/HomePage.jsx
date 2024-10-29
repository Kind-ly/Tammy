import { Metadata } from '@redwoodjs/web'

import MainLayout from 'src/layouts/MainLayout'

const HomePage = () => {
  return (
    <MainLayout>
      <Metadata title="Home" description="Home page" />

      <h1 className="text-2xl">HomePage</h1>
    </MainLayout>
  )
}

export default HomePage
