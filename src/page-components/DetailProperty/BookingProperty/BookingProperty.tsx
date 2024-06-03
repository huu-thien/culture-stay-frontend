import Button from '@mui/material/Button'
import { Divider } from '@mui/material'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { CalendarProperty } from '@/src/page-components/DetailProperty/BookingProperty/CalendarProperty'
import { QuantityContained } from '@/src/page-components/DetailProperty/QuantityContained'
import { useRouter } from 'next/navigation'
import { routes } from '@/src/routes'

interface Propstype {
  propertyId: number
  maxGuestCount: number
}
const BookingProperty = ({ propertyId, maxGuestCount }: Propstype) => {
  const userLogin = JSON.parse(localStorage.getItem('user_login') || '{}')
  const router = useRouter()

  const [dateStart, setDateStart] = useState<Date | null>(null)
  const [dateEnd, setDateEnd] = useState<Date | null>(null)
  const [guestCount, setGuestCount] = useState(0)

  const diffInMs =
    new Date(String(dateEnd)).getTime() - new Date(String(dateStart)).getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  const handleBooking = () => {
    if (userLogin) {
      if (dateStart && dateEnd && guestCount > 0) {
        const dataSendConfirm = {
          propertyId,
          guestId: userLogin.id || 1,
          checkInDate: new Date(String(dateStart)),
          checkOutDate: new Date(String(dateEnd)),
          numberOfGuest: guestCount,
          diffInDays: diffInDays + 1,
        }
        const resolveAfter2Sec = new Promise((resolve) =>
          setTimeout(resolve, 1400)
        )
        toast
          .promise(resolveAfter2Sec, {
            pending: 'Đang xử lý !',
            success: 'Hãy xác nhận để đặt phòng',
          })
          .then(() => {
            router.push(
              routes.bookingConfirm.sendData.generatePath(
                dataSendConfirm.propertyId,
                dataSendConfirm.guestId,
                dataSendConfirm.checkInDate,
                dataSendConfirm.checkOutDate,
                dataSendConfirm.numberOfGuest
              )
            )
          })
      } else {
        toast.error('Bạn phải nhập đầy đủ thông tin để đặt phòng !')
      }
    } else {
      toast.error('Bạn phải đăng nhập để đặt phòng !')
    }
  }
  return (
    <div className="border shadow-xl rounded-xl bg-white">
      <div className="grid p-5 max-w-[400xp]">
        <p className="py-4 text-gray-600 text-md text-center">
          Với sứ mệnh kết nối nên những căn phòng này là hoàn toàn miễn phí 💕
        </p>
        <Divider />
        <div className="flex flex-col gap-5">
          <p className="pt-8">Thời gian đặt phòng</p>
          <CalendarProperty
            propertyId={propertyId}
            dateStart={dateStart}
            dateEnd={dateEnd}
            setDateStart={setDateStart}
            setDateEnd={setDateEnd}
          />
          <QuantityContained
            guestCount={guestCount}
            setGuestCount={setGuestCount}
            maxGuestCount={maxGuestCount}
          />
        </div>
        <>
          <Button
            variant="contained"
            sx={{ height: 56, mt: 3 }}
            onClick={handleBooking}
          >
            ĐẶT PHÒNG
          </Button>
        </>
      </div>
    </div>
  )
}

export default BookingProperty
