import axios from 'axios'
import {$$} from 'vue/macros'
export function useAuth() {
  const register = async (mail: string, password: string): Promise<void> => {
    await axios.post(`${import.meta.env.VITE_API_HOST}/register`,{
      mail,
      password,
    })
  }

  const login = async (mail: string, password: string): Promise<void> => {
    await axios.post(`${import.meta.env.VITE_API_HOST}/login`,{
      mail,
      password,
    }, {withCredentials: true})
  }

  return $$({
    register,
    login
  })
}