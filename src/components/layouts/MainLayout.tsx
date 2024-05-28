import { Footer } from '@/src/components/Footer'
import { Header } from '@/src/components/Header'
import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import { THEME_DEFAULT } from '@/src/constant'

const MainLayout = ({ children }) => {
  const theme = createTheme(THEME_DEFAULT)
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div className="mx-auto w-full max-w-7xl mt-[80px] py-10 overflow-hidden">
        {children}
      </div>
      <Footer />
    </ThemeProvider>
  )
}

export default MainLayout
