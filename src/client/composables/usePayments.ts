import axios, {AxiosError} from 'axios'
import {$$} from 'vue/macros'
import UniversalCookie from "universal-cookie";
import {LoginType} from "../../server/services/AuthService/enum/LoginType";

interface Response {
  success: boolean;
  errors?: string[];
  payload: {
    id: string,
    hash: string,
  }
}

export function usePayments() {
  const createPayment = async (subscriptionId: number): Promise<Response> => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_HOST}/payment`, {
        subscriptionId,
      }, {withCredentials: true})
      return response.data
    } catch (e) {
      if(axios.isAxiosError(e)) {
        return e?.response?.data
      }
    }
  }
  return $$({
    createPayment,
  })
}