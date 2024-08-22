import { Request, Response } from 'express';
import { processDistanceCalculation } from '../services/processDistanceCalculation';
import axios from 'axios';
import logger from '../utils/logger';

const getDistance = async (req: Request, res: Response): Promise<void> => {
  try {
    const { origin, destination } = req.query;

    if (typeof origin !== 'string' || typeof destination !== 'string') {
      res.status(400).json({ error: 'Invalid query parameters' });
      return;
    }

    const distance = await processDistanceCalculation(origin, destination);
    res.json({ distance });
  } catch (error:unknown) {
    if (axios.isAxiosError(error)) {
      // Handle AxiosError specifically
      logger.error('Axios error message:', error.message);
      logger.error('Axios error response:', error.response?.data);
      logger.error('Axios error status:', error.response?.status);
      logger.error('Axios error headers:', error.response?.headers);
    } else if (error instanceof Error) {
      // Handle generic Error
      logger.error('Error message:', error.message);
    } else {
      // Handle unexpected types
      logger.error('An unexpected error occurred:', error);
    }
    res.status(500).json({ error: 'Failed to calculate distance' });
  }
};

export { getDistance };