import MainLayout from '@/src/components/layouts/MainLayout'
import { GuestProfile } from '@/src/page-components/HostGuestProfile/GuestProfile'
import { HostProfile } from '@/src/page-components/HostGuestProfile/HostProfile'
import React from 'react'

const HostGuestProfile = () => {
  const isHost = true
  return <MainLayout>{isHost ? <HostProfile /> : <GuestProfile />}</MainLayout>
}

export default HostGuestProfile
