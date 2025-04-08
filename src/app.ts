import express from 'express';
import router from './adapters/routes';
import { errorHandler } from './adapters/middlewares/errorHandlerMiddleware';
import { authHandler } from './adapters/middlewares/authMiddleware';

const app = express();

app.use(express.json());
app.use(authHandler);
app.use(router);
app.use(errorHandler);

export default app;
