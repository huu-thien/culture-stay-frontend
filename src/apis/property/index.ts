import {
  BACK_END_API_URL,
  DEFAULT_PAGE_SIZE,
} from '@/src/constant'
import { http } from '@/src/library/http'
import { IFilterPamrams } from '@/src/page-components/Home/FilterProperties/FilterProperty.type'
import { IProperty } from '@/src/page-components/Home/Properties/Properties.type'
import { getFilterParamsFromObject } from '@/src/utils/common'

const PROPERTY_PATH = `${BACK_END_API_URL}/api/properties`

export const getListProperty = (params: IFilterPamrams) => {
  const queryParams = getFilterParamsFromObject(params)
  return http.get<{ data: IProperty[]; totalPages: number }>(
    `${PROPERTY_PATH}?PageSize=${DEFAULT_PAGE_SIZE}&${queryParams}`
  )
}
export const getPropertyById = (id) => {
  return http.get<IProperty>(`${PROPERTY_PATH}/${id}`)
}
