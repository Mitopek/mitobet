import axios from 'axios'
import {$$} from 'vue/macros'
import {IGetFixturesRequest} from "../../server/controllers/FixtureController/types/IGetFixturesRequest.js";


export function useFixtures() {
  const getFixtures = async (): Promise<IGetFixturesRequest['response']['fixtures']> => {
    const res = await axios.get(`${import.meta.env.VITE_API_HOST}/fixtures`, {withCredentials : true} )
    return res.data.payload.fixtures
  }

  return $$({
    getFixtures,
  })
}