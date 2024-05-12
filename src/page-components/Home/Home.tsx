'use client'
import { getListProperty } from '@/src/apis/home'
import MainLayout from '@/src/components/layouts/MainLayout'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/src/constant'
import FilterProperty from '@/src/page-components/Home/FilterProperties/FilterProperty'
import {
  DEFAULT_FILTER_PARAMS,
  IFilterPamrams,
} from '@/src/page-components/Home/FilterProperties/FilterProperty.type'
import Properties from '@/src/page-components/Home/Properties/Properties'
import { IProperty } from '@/src/page-components/Home/Properties/Properties.type'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Home = () => {
  const [filterParams, setFilterParams] = useState<IFilterPamrams>(
    DEFAULT_FILTER_PARAMS
  )

  const [properties, setProperties] = useState<IProperty[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getListPropertyAsync = async (params: IFilterPamrams) => {
    try {
      setIsLoading(true)
      const { data, totalPages } = await getListProperty(params)
      setFilterParams({ ...filterParams, TotalPages: totalPages })
      setProperties(data)
    } catch (e) {
      toast.error(e.message)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getListPropertyAsync(filterParams)
  }, [filterParams.PageIndex])

  return (
    <MainLayout>
      <main className="flex flex-col items-center justify-between ">
        <FilterProperty
          filterParams={filterParams}
          setFilterParams={setFilterParams}
          getListPropertyAsync={getListPropertyAsync}
        />
        <Properties
          filterParams={filterParams}
          setFilterParams={setFilterParams}
          properties={properties}
          isLoading={isLoading}
        />
      </main>
    </MainLayout>
  )
}
export default Home
