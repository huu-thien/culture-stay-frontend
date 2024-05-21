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
}
