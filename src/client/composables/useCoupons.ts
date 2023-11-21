import axios from 'axios'
import {$$} from 'vue/macros'
import {ICouponEntity} from "../../server/models/CouponModel/types/ICouponEntity.js";

interface Response {
  success: boolean;
  errors?: string[];
  coupons: ICouponEntity[]
}

export function useCoupons() {
  const getCoupons = async (): Promise<Response['coupons']> => {
    const res = await axios.get(`${import.meta.env.VITE_API_HOST}/coupons`, {withCredentials : true} )
    return res.data.payload.coupons
  }

  const createCoupon = async (imageUrl: string, startDate: Date, description: string): Promise<void> => {
    await axios.post(`${import.meta.env.VITE_API_HOST}/coupon`, {
      imageUrl,
      startDate,
      description,
    },{withCredentials : true} )
  }

  const deleteCoupon = async (couponId: string): Promise<void> => {
    await axios.delete(`${import.meta.env.VITE_API_HOST}/coupon/${couponId}`,{withCredentials : true})
  }

  return $$({
    createCoupon,
    getCoupons,
    deleteCoupon,
  })
}