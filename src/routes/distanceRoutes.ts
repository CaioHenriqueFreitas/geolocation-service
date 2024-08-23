import { Router } from 'express';
import { getDistance } from '../controllers/distanceController';
import cors from 'cors';

const router: Router = Router();

router.use(cors());

router.get('/', getDistance);

export default router;