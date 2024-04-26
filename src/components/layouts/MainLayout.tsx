import { Footer } from '@/src/components/Footer'
import { Header } from '@/src/components/Header'
import React from 'react'

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="mx-auto w-full max-w-[1440px] mt-[80px] min-h-[1000px]">{children}</div>
      <Footer />
    </>
  )
}

export default MainLayout
