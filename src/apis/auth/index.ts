import { http } from '@/src/library/http'
import {
  LoginRequest,
  LogoutRequest,
  RegisterRequest,
} from '@/src/page-components/Authenticate/Authenticate.type'

const AUTHENTICATE_PATH = process.env.NEXT_PUBLIC_BACKEND_API_URL

export const postLogin = (loginRequest: LoginRequest) => {
  return http.post<{ accessToken; refreshToken; user }>(
    `${AUTHENTICATE_PATH}/api/auth/login`,
    {
      method: 'POST',
      body: JSON.stringify(loginRequest),
    }
  )
}

export const postRegister = (registerRequest: RegisterRequest) => {
  return http.post(`${AUTHENTICATE_PATH}/api/auth/register`, {
    method: 'POST',
    body: JSON.stringify(registerRequest),
  })
}

export const postLoginGoogle = (loginGoggleRequest) => {
  return http.post<{ accessToken; refreshToken; user }>(
    `${AUTHENTICATE_PATH}/api/auth/google-login?accessToken=${loginGoggleRequest}`,
    {
      method: 'POST',
    }
  )
}

export const postLogout = (logoutRequest) => {
  return http.post(
    `${AUTHENTICATE_PATH}/api/auth/revoke-token?refreshToken=${logoutRequest}`,
    {
      method: 'POST',
    }
  )
}
