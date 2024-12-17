import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { setupWebSocket } from './websocket.js';
import authRoutes from './routes/auth.routes.js';
import funnelRoutes from './routes/funnel.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';

import logger from './utils/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/funnels', funnelRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error handling
app.use(errorHandler);

const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Setup WebSocket
setupWebSocket(server);

export default server;
