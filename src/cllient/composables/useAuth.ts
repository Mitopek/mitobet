import axios, {AxiosError} from 'axios'
import {$$} from 'vue/macros'
import UniversalCookie from "universal-cookie";

interface Response {
  success: boolean;
  errors?: string[];
  payload: {
    user: {
      mail: string,
      isAdmin: boolean,
    }
  }
}

export function useAuth() {
  const register = async (mail: string, password: string): Promise<Response> => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_HOST}/register`, {
        mail,
        password,
      })
      return response.data
    } catch (e) {
      if(axios.isAxiosError(e)) {
        return e?.response?.data
      }
    }
  }

  const changePassword = async (oldPassword: string, password: string): Promise<Response> => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_HOST}/change-password`, {
        oldPassword,
        password,
      }, {withCredentials: true})
      return response.data
    } catch (e) {
      if(axios.isAxiosError(e)) {
        return e?.response?.data
      }
    }
  }

  const login = async (mail: string, password: string): Promise<Response> => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_HOST}/login`, {
        mail,
        password,
      }, {withCredentials: true})
      const cookies = new UniversalCookie()
      console.info(cookies.get('access_token'))
      cookies.set('mail', response.data.payload.user.mail)
      cookies.set('is_admin', response.data.payload.user.isAdmin)
      cookies.set('subscription_expires_at', response.data.payload.user.subscriptionExpiresAt)
      return response.data
    } catch (e) {
      if(axios.isAxiosError(e)) {
        return e?.response?.data
      }
    }
  }

  //TODO types every where, and res.cookies flags
  const logout = async (): Promise<Response> => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_HOST}/logout`,{},{withCredentials: true})
      const cookies = new UniversalCookie()
      cookies.remove('mail')
      cookies.remove('is_admin')
      cookies.remove('subscription_expires_at')
      return response.data
    } catch (e) {
      if(axios.isAxiosError(e)) {
        return e?.response?.data
      }
    }
  }

  return $$({
    register,
    changePassword,
    login,
    logout,
  })
}