'use client'

import MainLayout from '@/src/components/layouts/MainLayout'
import ManageProperty from '@/src/page-components/HostManageProperty/ManageProperty'
import { routes } from '@/src/routes'
import { Breadcrumbs, Button } from '@mui/material'
import Link from 'next/link'

const HostManageProperty = () => {
  return (
    <MainLayout>
      <div className="flex justify-between items-center">
        <Breadcrumbs aria-label="breadcrumb" className="py-4">
          <Link
            className="hover:underline hover:text-cyan-600 cursor-pointer"
            href={routes.home.generatePath()}
          >
            Trang chủ
          </Link>
          <p className="text-cyan-600">Quản lý phòng cho thuê</p>
        </Breadcrumbs>
        <Button variant="contained" color="primary">
          <Link href={routes.becomeHost.generatePath()}>Thêm phòng</Link>
        </Button>
      </div>
      <ManageProperty />
    </MainLayout>
  )
}
export default HostManageProperty
