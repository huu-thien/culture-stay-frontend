'use client'
import MainLayout from '@/src/components/layouts/MainLayout'
import { Button } from '@mui/material'
import { useSearchParams } from 'next/navigation'

import Image from 'next/image'
import { routes } from '@/src/routes'
import Link from 'next/link'
import PaymentSuccessImage from '@/assets/images/payment-success.webp'
import PaymentFailedImage from '@/assets/images/payment-failed.jpg'


const BookingResult = () => {
  const searchParams = useSearchParams()
  const isSuccess = searchParams.get('isSuccess')

  return (
    <MainLayout>
      <>
        {isSuccess === 'true' && (
          <div className="flex flex-col items-center my-4 h-screen ">
            <Image
              className="w-1/2 my-4"
              src={PaymentSuccessImage}
              alt="Success"
            />
            <h2 className="text-2xl font-bold text-cyan-800 my-2">
              Yêu cầu đặt phòng thành công
            </h2>
            <p className="text-gray-600 mb-4">
              Đơn đặt phòng của bạn đang được chủ nhà xử lý
            </p>
            <Button variant="contained">
              <Link href={routes.guestManageBooking.generatePath()}>
                Quản lý đặt phòng
              </Link>
            </Button>
          </div>
        )}
        {isSuccess === 'false' && (
          <div className="flex flex-col items-center my-4 h-screen ">
            <Image
              className="w-2/5 my-4"
              src={PaymentFailedImage}
              alt="Success"
            />
            <h2 className="text-2xl font-bold text-[#cb2b2f] my-2">
              Yêu cầu đặt phòng thất bại !
            </h2>
            <p className="text-gray-600 pb-4">
              Dường như đã có lỗi xảy ra, vui lòng thử lại sau !
            </p>
            <Button variant="contained">
              <Link href={routes.guestManageBooking.generatePath()}>
                Quản lý đặt phòng
              </Link>
            </Button>
          </div>
        )}
      </>
    </MainLayout>
  )
}

export default BookingResult
