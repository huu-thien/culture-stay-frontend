import { BACK_END_API_URL } from '@/src/constant'
import { http } from '@/src/library/http'

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
