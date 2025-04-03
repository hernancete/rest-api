import express from 'express';
import { findAllController } from './findAllController';
import { createUserController } from './createUserController';

const router = express.Router();

router.get('/users', findAllController);
router.post('/users', createUserController);

export default router;
