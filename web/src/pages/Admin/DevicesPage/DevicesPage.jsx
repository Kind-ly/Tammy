import { Metadata } from '@redwoodjs/web'

import DevicesCell from 'src/components/Device/DevicesCell'

const DevicesPage = () => {
  return (
    <>
      <Metadata title="Admin" description="Admin page" />

      <DevicesCell />
    </>
  )
}

export default DevicesPage
