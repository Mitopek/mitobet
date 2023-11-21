import axios from 'axios'
import {$$} from 'vue/macros'
import {IGetCountriesRequest} from "../../server/controllers/CountryController/types/IGetCountriesRequest.js";


export function useCountries() {
  const getCountries = async (): Promise<IGetCountriesRequest['response']> => {
    const res = await axios.get(`${import.meta.env.VITE_API_HOST}/countries`, {withCredentials : true} )
    return res.data.payload.countries
  }

  return $$({
    getCountries,
  })
}