import express from 'express';
import { findAllController } from './findAllController';
import { createUserController } from './createUserController';
import { deleteUserController } from './deleteUserController';

const router = express.Router();

router.get('/users', findAllController);
router.post('/users', createUserController);
router.delete('/users/:wallet_id', deleteUserController);

export default router;
