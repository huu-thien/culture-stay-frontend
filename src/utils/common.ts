import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

export const handleTrim = (value: string) => {
  if (typeof value === 'string') return value.trim()
  return value
}
export const handleSaveLogin = ({ accessToken, refreshToken, user }) => {
  toast.success('Đăng nhập thành công !')
  Cookies.set('jwt_token', accessToken)
  Cookies.set('refresh_token', refreshToken)
  localStorage.setItem('user_login', JSON.stringify(user))
}
export const handleSaveLogout = () => {
  Cookies.remove('jwt_token')
  Cookies.remove('refresh_token')
  localStorage.removeItem('user_login')
  toast.success('Đăng xuất thành công !')
}
