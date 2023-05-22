import axios from 'axios'
import {$$} from 'vue/macros'
import {ICouponEntity} from "../../server/models/CouponModel/types/ICouponEntity.js";
import {ICountryEntity} from "../../server/models/CountryModel/types/ICountryEntity.js";
import {IGetCountriesRequest} from "../../server/controllers/CountryController/types/IGetCountriesRequest.js";

interface Response {
  success: boolean;
  errors?: string[];
  countries: IGetCountriesRequest['response']
}

export function useCountries() {
  const getCountries = async (): Promise<Response['countries']> => {
    const res = await axios.get(`${import.meta.env.VITE_API_HOST}/countries`, {withCredentials : true} )
    return res.data.payload.countries
  }

  return $$({
    getCountries,
  })
}