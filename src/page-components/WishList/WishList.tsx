'use client'
import { Breadcrumbs, Pagination } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import PropertyItem from '@/src/page-components/Home/Properties/PropertyItem/PropertyItem'
import { routes } from '@/src/routes'

import { useRouter } from 'next/navigation'
import EmptyWishList from '@/src/page-components/WishList/EmptyWishList/EmptyWishList'
import MainLayout from '@/src/components/layouts/MainLayout'
import { DEFAULT_PAGE } from '@/src/constant'
import { IProperty } from '@/src/page-components/Home/Properties/Properties.type'
import { getWishlists } from '@/src/apis/wishlist'
import Skeleton from '@/src/page-components/Home/Properties/Skeleton/Skeleton'

const WishList = () => {
  const user = true
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE)
  const [totalPages, setTotalPages] = useState<number>(0)
  const router = useRouter()
  const [wishlistProperty, setWishlistProperty] = useState<IProperty[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    getPropertyWishlist(currentPage)
  }, [currentPage])

  const getPropertyWishlist = async (page: number) => {
    try {
      setIsLoading(true)
      const {
        data: { data, totalPages },
      } = await getWishlists(page)
      setWishlistProperty(data)
      setTotalPages(totalPages)
    } catch (err) {
    } finally {
      setIsLoading(false)
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
        ) : wishlistProperty.length > 0 ? (
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-6 mt-5">
              {wishlistProperty.map((property) => (
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
            <div className="py-8 flex items-center justify-center">
              <Pagination
                color="primary"
                count={totalPages}
                page={currentPage}
                onChange={handleChangePage}
                sx={{ mx: 'auto' }}
              />
            </div>
          </div>
        ) : (
          <EmptyWishList />
        )}
      </>
    </MainLayout>
  )
}

export default WishList
