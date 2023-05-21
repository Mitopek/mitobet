import axios from 'axios'
import {$$} from 'vue/macros'
import {ICouponEntity} from "../../server/models/CouponModel/types/ICouponEntity.js";

interface Response {
  success: boolean;
  errors?: string[];
  sports: {
    group: string,
    titles: string[]
  }[]
}

export function useSports() {
  const getSports = async (): Promise<Response['sports']> => {
    const res = await axios.get(`${import.meta.env.VITE_API_HOST}/sports`, {withCredentials : true} )
    return res.data.payload.sports
  }

  return $$({
    getSports,
  })
}