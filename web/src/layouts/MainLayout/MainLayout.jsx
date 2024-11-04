import Navbar from 'src/components/Navbar/Navbar'

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="w-full">
        <div className="mx-auto max-w-screen-xl p-4 md:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </>
  )
}

export default MainLayout
