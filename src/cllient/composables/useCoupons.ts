import axios from 'axios'
import {$$} from 'vue/macros'
export function useCoupons() {
  const getCoupons = async (): Promise<unknown> => {
    const res = await axios.get(`${import.meta.env.VITE_API_HOST}/coupons`, {withCredentials: true})
    console.info(res)
    return res
  }

  return $$({
    getCoupons,
  })
}