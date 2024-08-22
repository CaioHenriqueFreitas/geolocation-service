import { Request, Response } from 'express';
import processDistanceCalculation from '../services/processDistanceCalculation';
import logger from '../utils/logger';

const getDistance = async (req: Request, res: Response): Promise<void> => {
  try {
    const { origin, destination } = req.query;

    if (typeof origin !== 'string' || typeof destination !== 'string') {
      res.status(400).json({ error: 'Invalid query parameters' });
      return;
    }

    const distance = await processDistanceCalculation.processDistanceCalculation(origin, destination);
    res.json({ distance });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Failed to calculate distance' });
  }
};

export { getDistance };