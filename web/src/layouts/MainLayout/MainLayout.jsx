const MainLayout = ({ children }) => {
  return (
    <>
      <div className="w-full text-gray-700 bg-white">
        <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between py-4">
            <a
              href="https://kind.ly"
              className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg focus:outline-none focus:shadow-outline"
            >
              Kindly
            </a>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="max-w-screen-xl p-4 mx-auto md:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </>
  )
}

export default MainLayout
