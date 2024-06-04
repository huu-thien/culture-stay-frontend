import { WishList } from '@/src/page-components/WishList'

export const routes = {
  home: {
    generatePath: () => '/',
  },
  authenticate: {
    generatePath: () => '/authenticate',
  },
  detailProperty: {
    generatePath: (id) => `/detail-property/${id}`,
  },
  myAccount: {
    generatePath: () => '/my-account',
  },
  hostProfile: {
    generatePath: (id) => `/host-profile/${id}`,
  },
  guestProfile: {
    generatePath: (id) => `/guest-profile/${id}`,
  },
  wishlist: {
    generatePath: () => '/wishlist',
  },
  guestManageBooking: {
    generatePath: () => '/guest-manage-bookings',
  },
  hostManageProperty: {
    generatePath: () => '/host-manage-property',
  },
  bookingConfirm: {
    sendData: {
      generatePath: (
        propertyId: number,
        guestId: number,
        checkInDate: Date,
        checkOutDate: Date,
        numberOfGuest: number
      ) =>
        `/booking-confirm?propertyId=${propertyId}&guestId=${guestId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&numberOfGuest=${numberOfGuest}`,
    },
    generatePath: () => '/booking-confirm',
  },
  bookingResult: {
    sendData: {
      generatePath: (isSuccess: boolean) =>
        `/booking-result?isSuccess=${isSuccess}`,
    },
    generatePath: () => '/booking-result',
  },
}
