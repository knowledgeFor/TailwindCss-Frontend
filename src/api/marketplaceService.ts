import { fetchData } from './apiUtils'

export const getAllMarketPlaces = async (): Promise<any> => {
  return fetchData<any>('/marketplace/getListings', 'base', { method: 'GET' })
}
