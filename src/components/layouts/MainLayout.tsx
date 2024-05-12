import { Footer } from '@/src/components/Footer'
import { Header } from '@/src/components/Header'
import React from 'react'

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="mx-auto w-full max-w-[1440px] mt-[80px] py-10 overflow-hidden">
        {children}
      </div>
      <Footer />
    </>
  )
}

export default MainLayout
