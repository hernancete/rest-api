import express from 'express';
import router from './adapters/routes';
import { errorHandler } from './adapters/middlewares/errorHandlerMiddleware';

const app = express();

app.use(express.json());
app.use(router);
app.use(errorHandler);

export default app;
