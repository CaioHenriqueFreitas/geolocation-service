import { getLocation } from './geolocationProvider';
import { calculateDistance } from '../utils/distanceCalculator';

const processDistanceCalculation = async (origin: string, destination: string): Promise<number> => {
  
  const originLatLon = await getLocation(origin);
  const sourceLatLon = await getLocation(destination);
  
  const distance = calculateDistance(
    originLatLon.lat,
    originLatLon.lon,
    sourceLatLon.lat,
    sourceLatLon.lon
  )
  
  return distance;
};

export default { processDistanceCalculation };