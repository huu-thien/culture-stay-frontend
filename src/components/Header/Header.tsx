'use client'
import React from 'react'

import Logo from '@/assets/images/logo-aircnc.png'
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import SearchIcon from '@mui/icons-material/Search'
import GiteIcon from '@mui/icons-material/Gite'
import MenuIcon from '@mui/icons-material/Menu'
import Image from 'next/image'
import { toast } from 'react-toastify'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { routes } from '@/src/routes'
import { useRouter } from 'next/navigation'
// import { postLogout } from '@/src/apis/auth'
import { handleSaveLogout } from '@/src/utils/common'
import { TOAST_MESSAGE } from '@/src/toast-message/ToastMessage'

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const router = useRouter()

  const handleLogout = async () => {
    try {
      // const refreshToken = Cookies.get('refresh_token')
      // await toast.promise(postLogout(refreshToken), {
      //   pending: TOAST_MESSAGE.logout.pending,
      //   success: TOAST_MESSAGE.logout.success,
      //   error: TOAST_MESSAGE.logout.error,
      // })
      const resolveAfter2Sec = new Promise((resolve) =>
        setTimeout(resolve, 2000)
      )
      toast
        .promise(resolveAfter2Sec, {
          pending: TOAST_MESSAGE.logout.pending,
          success: TOAST_MESSAGE.logout.success,
        })
        .then(() => {
          handleSaveLogout()
          router.push(routes.authenticate.generatePath())
        })
    } catch (error) {}
  }
  const userLogin = JSON.parse(localStorage.getItem('user_login'))
  // console.log('user', userLogin)

  // const buttonStyle = {
  //   backgroundColor: '#ff385c',
  //   '&:hover': {
  //     backgroundColor: '#fe365c', // Màu xanh khi hover
  //   },
  // };
  const role = 'Admin'
  return (
    <header className="block h-[70px] sm:h-[80px] shadow-md fixed top-0 left-0 right-0 bg-white z-10">
      <div className="px-5 md:px-10">
        <div className="py-4 mx-auto w-full max-w-7xl flex items-center justify-between sm:h-full sm:py-0">
          <Link href="/">
            <Image
              src={Logo}
              alt=""
              className="inline-block"
              width={150}
              height={200}
            />
          </Link>
          {/* <div className="relative w-full xs:w-[50%] md:max-w-[400px] ">
            <TextField
              id="search-input"
              label="Search"
              variant="outlined"
              size="small"
              fullWidth
            />
            <IconButton sx={{ position: 'absolute', right: '5px' }}>
              <SearchIcon />
            </IconButton>
          </div> */}
          <div className="flex items-center gap-8">
            <div className="hidden md:block">
              {userLogin?.isHost ? (
                <Tooltip title="Trở nhà chủ nhà và kinh doanh" arrow>
                  <Button
                    variant="contained"
                    size="medium"
                    endIcon={<GiteIcon />}
                  >
                    <Link href="/host-manage-property">
                      Quản lý phòng cho thuê
                    </Link>
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip title="Trở nhà chủ nhà và kinh doanh" arrow>
                  <Button
                    variant="contained"
                    size="medium"
                    endIcon={<GiteIcon />}
                  >
                    <Link href="/become-host">Become a host</Link>
                  </Button>
                </Tooltip>
              )}
            </div>
            <span
              className="flex items-center gap-2 border px-2 py-1 rounded-full cursor-pointer"
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MenuIcon sx={{ color: '#9a9a9a' }} />
              <Avatar
                alt={'userLogin?.fullName'}
                sx={
                  true
                    ? { width: 30, height: 30, bgcolor: '#1976d2' }
                    : { width: 30, height: 30 }
                }
                src={
                  userLogin && userLogin.avatarUrl
                    ? `${userLogin?.avatarUrl}`
                    : ``
                }
              >
                {userLogin && userLogin.avatarUrl
                  ? ``
                  : userLogin?.fullName[0].toUpperCase()}
              </Avatar>
            </span>
            {userLogin && (
              <Menu
                className="rouned-lg"
                id="account-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    borderRadius: 3,
                    mt: 1,
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleClose}>
                  <Link className="w-full text-cyan-800" href="/wishlist">
                    Danh sách yêu thích
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link
                    className="w-full text-cyan-800"
                    href="/list-booking-guest"
                  >
                    Quản lý đặt phòng
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link className="w-full text-cyan-800" href={routes.myAccount.generatePath()}>
                    Tài khoản
                  </Link>
                </MenuItem>
                {userLogin?.isHost && (
                  <MenuItem onClick={handleClose}>
                    <Link
                      className="w-full text-cyan-800"
                      href="/host-manage-property"
                    >
                      Quản lý phòng cho thuê
                    </Link>
                  </MenuItem>
                )}
                {userLogin?.isHost && (
                  <MenuItem onClick={handleClose}>
                    <Link
                      className="w-full text-cyan-800"
                      href="/host-manage-booking"
                    >
                      Quản lý booking
                    </Link>
                  </MenuItem>
                )}

                {role === 'Admin' && (
                  <MenuItem onClick={handleClose}>
                    <Link className="w-full text-cyan-800" href="/admin">
                      Chức năng Admin
                    </Link>{' '}
                  </MenuItem>
                )}
                <MenuItem onClick={handleClose}>
                  <Link className="w-full text-cyan-800" href="/chat">
                    Tin nhắn
                  </Link>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <Link className="w-full text-cyan-800" href="/help">
                    Trung tâm trợ giúp
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <p className="w-full text-red-600" onClick={handleLogout}>
                    Đăng xuất
                  </p>
                </MenuItem>
              </Menu>
            )}
            {!userLogin && (
              <Menu
                className="rouned-lg"
                id="account-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    borderRadius: 3,
                    mt: 1,
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleClose}>
                  <Link
                    className="w-full text-cyan-800"
                    href={routes.authenticate.generatePath()}
                  >
                    Đăng nhập
                  </Link>
                </MenuItem>
                <Divider light />
                <MenuItem onClick={handleClose}>
                  <Link className="w-full text-cyan-800" href="/become-host">
                    Cho thuê chỗ ở qua AirCnc
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link className="w-full text-cyan-800" href="/help">
                    Trung tâm trợ giúp
                  </Link>
                </MenuItem>
              </Menu>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
