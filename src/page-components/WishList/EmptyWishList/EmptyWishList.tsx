import React from 'react'
import EmptyData from '@/src/assets/images/empty_box.png'
import ImageDecorate from '@/src/assets/images/booking-decorate.webp'

import { Alert } from '@mui/material'
import Image from 'next/image'
const EmptyWishList = () => {
  return (
    <div className="px-5 md:px-10">
      <div className="mx-auto w-full max-w-7xl grid grid-cols-2">
        <div className=" flex flex-col items-center gap-12">
          <Image src={EmptyData} width={300} height={300} alt="Wishlistpage" />
          <div className="">
            <h1 className="font-bold text-cyan-700 mb-8 text-2xl text-center">
              Danh sách yêu thích của bạn đang trống 💓
            </h1>
            <Alert sx={{ mb: 2 }} severity="info" className="text-center">
              Hãy thêm những địa điểm mà bạn yêu thích và trải nghiệm chúng !
            </Alert>
          </div>
        </div>
        <Image
          src={ImageDecorate}
          alt="Wishlistpage"
          className="mx-auto inline-block h-full w-full  object-cover rounded-2xl"
        />
      </div>
    </div>
  )
}

export default EmptyWishList
