import express from 'express';
import { findAllController } from './controllers/findAllController';
import { createUserController } from './controllers/createUserController';
import { deleteUserController } from './controllers/deleteUserController';

const router = express.Router();

router.get('/users', findAllController);
router.post('/users', createUserController);
router.delete('/users/:wallet_id', deleteUserController);

export default router;
