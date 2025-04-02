import express from 'express';
import { findAllController } from './findAllController';

const router = express.Router();

router.get('/users', findAllController);

export default router;
