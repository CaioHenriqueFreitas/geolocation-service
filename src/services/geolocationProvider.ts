import axios, { AxiosResponse } from 'axios';
import { NominatimResponse } from '../utils/interfaces';
import logger from '../utils/logger';

export const getLocation = async (address: string): Promise< {lat: number, lon:number} > => {
  const response: AxiosResponse<NominatimResponse[]> = await axios.get('https://nominatim.openstreetmap.org/search', {
    params: {
        q:address,
        format: 'json',
        limit: 1
    }
  });
  if (response.data.length === 0) {
    logger.error('No results found for the address');
    throw new Error('No results found for the address');
  }
  logger.info(`Address latitude successfully retrieved for ${address}.`);
  const { lat, lon } = response.data[0];
  return {
    lat: parseFloat(lat),
    lon: parseFloat(lon),
  };
};

export default { getLocation };