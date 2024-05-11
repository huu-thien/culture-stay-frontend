import { Footer } from '@/src/components/Footer'
import { Header } from '@/src/components/Header'
import React from 'react'

const MainLayout = ({ children }) => {
  return (
    <p>
      <Header />
      <div className="mx-auto w-full max-w-[1440px] mt-[80px] min-h-[1000px] py-10 overflow-hidden">
        {children}
      </div>
      <Footer />
    </p>
  )
}

export default MainLayout
