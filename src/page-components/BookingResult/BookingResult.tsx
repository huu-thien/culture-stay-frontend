'use client'
import MainLayout from '@/src/components/layouts/MainLayout'
import { Button } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'

import Image from 'next/image'
import { routes } from '@/src/routes'
import Loading from '@/src/components/Loading/Loading'
import Link from 'next/link'
import PaymentSuccessImage from '@/assets/images/payment-success.webp'
import PaymentFailedImage from '@/assets/images/payment-failed.jpg'
import { useEffect, useState } from 'react'
import { createBooking } from '@/src/apis/booking'
import { resolve } from 'node:path/win32'

const BookingResult = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
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
              <Link href="/list-booking-guest">Quản lý đặt phòng</Link>
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
              Booking của bạn vẫn sẽ được lưu ở trạng thái đang chờ xác nhận. Đi
              đến trang quản lý để tiến hành yêu cầu đặt phòng lại nhé !
            </p>
            <Button variant="contained">
              <Link href="/list-booking-guest">Quản lý đặt phòng</Link>
            </Button>
          </div>
        )}
      </>
    </MainLayout>
  )
}

export default BookingResult
