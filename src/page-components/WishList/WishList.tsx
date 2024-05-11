'use client'
// import { PropertyType } from '@/@types/property';
// import RoomItem from '@/components/HomePage/RoomItem';
// import { getWishlistProperty } from '@/services/WishlistService/wishlistService';
import { Breadcrumbs, Pagination } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
// import { Link, Navigate } from 'react-router-dom';
import Link from 'next/link'
import PropertyItem from '@/src/page-components/Home/Properties/PropertyItem/PropertyItem'
import { routes } from '@/src/routes'

import { useRouter } from 'next/navigation'
import EmptyWishList from '@/src/page-components/WishList/EmptyWishList/EmptyWishList'
import MainLayout from '@/src/components/layouts/MainLayout'

const WishList = () => {
  const user = true
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const router = useRouter()
  // const [wishlistProperty, setWishlistProperty] = useState<PropertyType[]>([]);
  const [wishlistProperty, setWishlistProperty] = useState([])

  useEffect(() => {
    getPropertyWishlist(currentPage)
  }, [currentPage])

  const getPropertyWishlist = async (page: number) => {
    try {
      // const response = await getWishlistProperty(page);
      // if (response && response.status === 200) {
      //   setWishlistProperty(response.data.data);
      //   setTotalPages(response.data.totalPages);
      //   console.log('goi api thanh cong', response.data);
      // }
    } catch (err) {
      console.log('err wishlist: ')
    }
  }
  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Sử dụng thuộc tính behavior để tạo hiệu ứng cuộn mượt
    })
  }
  if (!user) {
    router.push(routes.authenticate.generatePath())
  }
  return (
    <MainLayout>
      <Breadcrumbs aria-label="breadcrumb" className="py-4">
        <Link
          className="hover:underline hover:text-cyan-600 cursor-pointer"
          href={routes.home.generatePath()}
        >
          Trang chủ
        </Link>
        <p className="text-cyan-600">Danh sách yêu thích</p>
      </Breadcrumbs>
      {wishlistProperty.length > 0 ? (
        <>
          <PropertyItem />
          <PropertyItem />
          <PropertyItem />
          <PropertyItem />
        </>
      ) : (
        // <div>
        //   <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-6 mt-5'>
        //     {wishlistProperty.map((property, index) => (
        //       <PropertyItem
        //         // key={`perroperty_${index}`}
        //         // id={property.id}
        //         // title={property.title}
        //         // propertyImage={property.propertyImages}
        //         // pricePerNight={property.pricePerNight}
        //         // numberOfReviews={property.numberOfReviews}
        //         // rating={property.rating}
        //         // isFavorite={property.isFavorite}
        //       />
        //     ))}
        //   </div>
        //   <div className='py-8 flex items-center'>
        //     <Pagination
        //       color='primary'
        //       count={totalPages}
        //       page={currentPage}
        //       onChange={handleChangePage}
        //       sx={{ width: '100%', mx: 'auto' }}
        //     />
        //   </div>
        // </>
        <EmptyWishList />
      )}
    </MainLayout>
  )
}

export default WishList
