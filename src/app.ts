import express, { Application } from 'express';
import distanceRoutes from './routes/distanceRoutes';

const app: Application = express();

app.use(express.json());
app.use('/api/distance', distanceRoutes);

export default app;