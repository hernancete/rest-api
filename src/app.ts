import express from 'express';
import router from './adapters/routes';

const app = express();
app.use(router);

export default app;
