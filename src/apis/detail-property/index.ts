import { BACK_END_API_URL, DEFAULT_PAGE_SIZE_REVIEW } from '@/src/constant'
import { http } from '@/src/library/http'
import { IReviewProperty } from '@/src/page-components/DetailProperty/ReviewProperty/ReviewProperty.type'
import { IProperty } from '@/src/page-components/Home/Properties/Properties.type'

const DETAIL_PROPERTY_PATH = `${BACK_END_API_URL}/api`

export const getPropertyById = (id) => {
  return http.get<IProperty>(`${DETAIL_PROPERTY_PATH}/properties/${id}`)
}

export const getPropertyReview = (id, page) => {
  return http.get<{ data: IReviewProperty[]; totalPages: number }>(
    `${DETAIL_PROPERTY_PATH}/reviews/property/${id}?PageSize=${DEFAULT_PAGE_SIZE_REVIEW}&PageIndex=${page}`
  )
}
