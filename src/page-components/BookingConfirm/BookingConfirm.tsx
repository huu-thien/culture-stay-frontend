'use client'
import MainLayout from '@/src/components/layouts/MainLayout'
import { Button, Chip } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useEffect, useState } from 'react'
import { formatDateYYYYMMDD } from '@/src/utils/DateBookingHandler'
import ConfirmBookingImg from '@/assets/images/confirm-booking.png'
import Image from 'next/image'
import { routes } from '@/src/routes'
import Loading from '@/src/components/Loading/Loading'

const BookingConfirm = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const propertyId = searchParams.get('propertyId')
  const guestId = searchParams.get('guestId')
  const checkInDate = searchParams.get('checkInDate')
  const checkOutDate = searchParams.get('checkOutDate')
  const numberOfGuest = searchParams.get('numberOfGuest')

  const [noteValue, setNoteValue] = useState('')

  const handleRequestBooking = () => {}
  const isReceiveData =
    propertyId && guestId && checkInDate && checkOutDate && numberOfGuest

  return (
    <MainLayout>
      {isReceiveData ? (
        <>
          <div className="inline-flex gap-3">
            <p
              className="hover:underline hover:text-cyan-600"
              onClick={() =>
                router.push(routes.detailProperty.generatePath(propertyId))
              }
            >
              <ArrowBackIcon />
            </p>
            <h1 className="font-bold text-2xl  text-cyan-800 line-clamp-1">
              Yêu cầu đặt phòng/đặt chỗ
            </h1>
          </div>
          <div className="flex gap-6 justify-between">
            <div className="w-2/5">
              <h2 className="text-xl text-cyan-800 font-bold pt-8 pb-3">
                Chuyến đi của bạn
              </h2>
              <div className="">
                <div className="flex items-center justify-between py-2">
                  <p>Ngày đi</p>
                  <Chip label={formatDateYYYYMMDD(String(checkInDate))} />
                </div>
                <div className=""></div>
                <div className=""></div>
                <div className="flex items-center justify-between py-2">
                  <p>Ngày về</p>
                  <Chip label={formatDateYYYYMMDD(String(checkOutDate))} />
                </div>
                <div className=""></div>
                <div className=""></div>
                <div className="flex items-center justify-between py-2">
                  <p>Số khách</p>
                  <Chip label={`${numberOfGuest} người`} />
                </div>
              </div>
              <h2 className="text-xl text-cyan-800 font-bold pb-3 pt-5">
                Ghi chú cho chủ nhà
              </h2>
              <textarea
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none mb-6"
                placeholder="Ghi chú cho chủ nhà ... "
                value={noteValue}
                onChange={(e) => setNoteValue(e.target.value)}
              ></textarea>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleRequestBooking}
              >
                Yêu cầu đặt phòng
              </Button>
            </div>
            <div>
              <Image
                src={ConfirmBookingImg}
                alt="ConfirmBookingImg"
                className="w-full"
              />
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </MainLayout>
  )
}

export default BookingConfirm
