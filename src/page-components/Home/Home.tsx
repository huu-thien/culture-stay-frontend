'use client'
import MainLayout from '@/src/components/layouts/MainLayout'
import Properties from '@/src/page-components/Home/Properties/Properties'
const Home = () => {
  return (
    <MainLayout>
      <main className="flex min-h-screen flex-col items-center justify-between ">
        <Properties />
      </main>
    </MainLayout>
  )
}
export default Home
