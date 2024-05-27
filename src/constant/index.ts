
export const BACK_END_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL

export const DEFAULT_PAGE = 1
export const DEFAULT_PAGE_SIZE = 12
export const DEFAULT_PAGE_SIZE_REVIEW_PROPERTY = 4
export const DEFAULT_PAGE_SIZE_REVIEW_HOST_GUEST = 6
export const DEFAULT_PAGE_SIZE_PROPERTY_FOR_RENT = 3
export const DEFAULT_LANGUAGE = 'en'
export const BAD_REQUEST = 400
export const NO_CONTENT = 204
export const UNAUTHORIZED = 401
export enum USER_ROLE {
  HOST = 'Host',
  GUEST = 'Guest',
}
export enum APP_ROLE {
  ADMIN = 'Admin',
  USER = 'User',
}
export enum STATUS_PROPERTY {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Radio',
}
