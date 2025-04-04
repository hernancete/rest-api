import express from 'express';
import { findAllController } from './controllers/findAllController';
import { createUserController } from './controllers/createUserController';
import { deleteUserController } from './controllers/deleteUserController';
import { updateUserController } from './controllers/updateUserController';

const router = express.Router();

router.get('/users', findAllController);
router.post('/users', createUserController);
router.put('/users/:wallet_id', updateUserController);
router.delete('/users/:wallet_id', deleteUserController);

export default router;
