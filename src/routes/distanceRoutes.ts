import { Router } from 'express';
import { getDistance } from '../controllers/distanceController';

const router: Router = Router();

router.get('/', getDistance);

export default router;