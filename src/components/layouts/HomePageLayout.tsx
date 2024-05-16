import { Footer } from '@/src/components/Footer'
import { Header } from '@/src/components/Header'
import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material'

const HomePageLayout = ({ children }) => {
  const theme = createTheme({
    typography: {
      fontFamily: 'Lexend',
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div className="mx-auto w-full max-w-[1440px] mt-[80px] py-10 overflow-hidden">
        {children}
      </div>
      <Footer />
    </ThemeProvider>
  )
}

export default HomePageLayout
