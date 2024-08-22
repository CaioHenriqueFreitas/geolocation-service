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
  })
  .catch((error: unknown) => {
    if (axios.isAxiosError(error)) {
      logger.error('Axios error message:', error.message);
      logger.error('Axios error response:', error.response?.data);
      logger.error('Axios error status:', error.response?.status);
      logger.error('Axios error headers:', error.response?.headers);
    } else if (error instanceof Error) {
      logger.error('Error message:', error.message);
    } else {
      logger.error('An unexpected error occurred:', error);
    }
    throw error;
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