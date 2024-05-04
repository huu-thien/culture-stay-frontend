import React from 'react'
import ShareIcon from '@mui/icons-material/Share'
import Button from '@mui/material/Button'
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot'
import PlaceIcon from '@mui/icons-material/Place'
import { Breadcrumbs } from '@mui/material'
import Link from 'next/link'
import { routes } from '@/src/routes'

const Title = () => {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          href={routes.home.generatePath()}
          className="hover:underline hover:text-cyan-600"
        >
          Trang chủ
        </Link>
        <p color="">Chi tiết phòng</p>
      </Breadcrumbs>
      <div className="flex justify-between items-start py-4">
        <div className="flex-auto pr-12">
          <h1 className="font-bold text-2xl  text-cyan-800 line-clamp-1">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda,
            magnam officia? Asperiores est repellendus expedita blanditiis,
            veritatis velit excepturi itaque in nostrum! Aliquam, quidem quod.
            Qui aliquid perferendis quos quidem.
          </h1>
          <p className="text-gray-500 py-3">
            <PlaceIcon sx={{ color: '#c92327' }} />
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda
            - Da nang
          </p>
        </div>
        <div className="flex min-w-[200px]">
          <Button variant="text">
            <ShareIcon />
            <p className="font-extralight underline">Chia sẻ</p>
          </Button>
          <Button variant="text">
            <TurnedInNotIcon />
            <p className="font-extralight underline">Lưu</p>
          </Button>
        </div>
      </div>
    </>
  )
}

export default Title
