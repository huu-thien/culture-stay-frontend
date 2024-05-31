import { BACK_END_API_URL } from '@/src/constant'
import { http } from '@/src/library/http'
import { IBookingOfGuest } from '@/src/page-components/GuestManageBookings/constant'

const BOOKING_PATH = `${BACK_END_API_URL}/api/bookings`

export const createBooking = (data) => {
  return http.post(`${BOOKING_PATH}`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
export const getListBookingOfproperty = (propertyId, fromDate, toDate) => {
  return http.get<{ data }>(
    `${BOOKING_PATH}/property/${propertyId}?fromDate=${fromDate}&toDate=${toDate}`
  )
}

export const getListBookingOfGuest = (guestId) => {
  return http.get<{ data: IBookingOfGuest[]; totalPages: number }>(
    `${BOOKING_PATH}/guest/${guestId}?OrderBy=CreatedAt&IsDescending=false`
  )
}
