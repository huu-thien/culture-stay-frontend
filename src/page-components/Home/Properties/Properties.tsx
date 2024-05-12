import PropertyItem from '@/src/page-components/Home/Properties/PropertyItem/PropertyItem'
import React, { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { Pagination } from '@mui/material'
import { IProperty } from '@/src/page-components/Home/Properties/Properties.type'

import Skeleton from '@/src/page-components/Home/Properties/Skeleton/Skeleton'
import { IFilterPamrams } from '@/src/page-components/Home/FilterProperties/FilterProperty.type'
import Image from 'next/image'
import EmtyData from '../../../../public/images/empty_box.png'

interface IPropertiesProps {
  filterParams: IFilterPamrams
  setFilterParams: Dispatch<SetStateAction<IFilterPamrams>>
  properties: IProperty[]
  isLoading: boolean
}

const Properties = ({
  filterParams,
  setFilterParams,
  properties,
  isLoading,
}: IPropertiesProps) => {
  const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
    setFilterParams({ ...filterParams, PageIndex: page })
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-6 mt-5">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : properties.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-6 mt-5">
            {properties.map((property) => (
              <PropertyItem
                key={property.id}
                propertyId={property.id}
                title={property.title}
                propertyImages={property.propertyImages}
                numberOfReviews={property.numberOfReviews}
                rating={property.rating}
                isFavorite={property.isFavorite}
              />
            ))}
          </div>
          <div className="py-8 flex items-center">
            <Pagination
              color="primary"
              count={filterParams.TotalPages}
              page={filterParams.PageIndex}
              onChange={handleChangePage}
              sx={{ width: '100%', mx: 'auto' }}
            />
          </div>
        </>
      ) : (
        <div className="px-5 md:px-10 py-12">
          <Image
            src={EmtyData}
            alt="empty-data"
            width={300}
            height={300}
            className="mx-auto"
          />
          <h1 className="font-bold text-cyan-700 mb-8 text-2xl text-center">
            Có vẻ như phòng bạn muốn tìm không tồn tại 💓
          </h1>
          <p className="text-center text-cyan-700">
            Hãy xóa bộ lọc và tìm kiếm những căn phòng tuyệt vời khác nhé!
          </p>
        </div>
      )}
    </>
  )
}

export default Properties
