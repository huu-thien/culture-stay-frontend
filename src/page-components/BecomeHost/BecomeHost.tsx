'use client'

import MainLayout from '@/src/components/layouts/MainLayout'
import BannerIntroduce from '@/src/page-components/BecomeHost/BannerIntroduce/BannerIntroduce'
import FormCreateProperty from '@/src/page-components/BecomeHost/FormCreateProperty/FormCreateProperty'
import { routes } from '@/src/routes'
import { Alert, Button } from '@mui/material'
import Link from 'next/link'

const GuestProfile = () => {
  const userLogin = JSON.parse(localStorage.getItem('user_login')) || '{}'
  return (
    <MainLayout>
      <BannerIntroduce />
      {userLogin ? (
        <FormCreateProperty />
      ) : (
        <div className="flex items-center justify-center gap-12 py-6">
          <Alert sx={{ fontSize: 15 }} severity="warning">
            Bạn phải đăng nhập để thực hiện chức năng này !
          </Alert>
          <Button variant="contained">
            <Link href={routes.authenticate.generatePath()}>
              Đăng nhập ngay
            </Link>
          </Button>
        </div>
      )}
    </MainLayout>
  )
}

export default GuestProfile
