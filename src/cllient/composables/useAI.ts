import axios, {AxiosError} from 'axios'
import {$$} from 'vue/macros'
import UniversalCookie from "universal-cookie";

interface Response {
  success: boolean;
  errors?: string[];
  payload: {
    message: string,
  }
}

export function useAI() {
  const sendMessage = async (content: string): Promise<Response> => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_HOST}/ai`, {
        content
      }, {withCredentials: true})
      console.info(response.data)
      return response.data
    } catch (e) {
      if(axios.isAxiosError(e)) {
        return e?.response?.data
      }
    }
  }

  return $$({
    sendMessage
  })
}