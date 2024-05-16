import { BACK_END_API_URL, DEFAULT_PAGE_SIZE_REVIEW } from '@/src/constant'
import { http } from '@/src/library/http'

const DETAIL_PROPERTY_PATH = `${BACK_END_API_URL}/api/hosts`

export const getHostInfo = (id) => {
  return http.get(`${DETAIL_PROPERTY_PATH}/${id}`)
}
