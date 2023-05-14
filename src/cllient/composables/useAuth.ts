import axios, {AxiosError} from 'axios'
import {$$} from 'vue/macros'

interface Response {
  success: boolean;
  errors?: string[];
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

  const login = async (mail: string, password: string): Promise<Response> => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_HOST}/login`, {
        mail,
        password,
      }, {withCredentials: true})
      return response.data
    } catch (e) {
      if(axios.isAxiosError(e)) {
        return e?.response?.data
      }
    }
  }

  return $$({
    register,
    login
  })
}