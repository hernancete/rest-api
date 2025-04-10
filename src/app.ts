import express from 'express';
import router from './adapters/routes';
import { errorHandler, notFoundErrorHandler } from './adapters/middlewares/errorHandlerMiddleware';
import { authHandler } from './adapters/middlewares/authMiddleware';

const app = express();

app.use(express.json());
app.use(authHandler);
app.use(router);
app.use(errorHandler);
app.use(notFoundErrorHandler);

export default app;
