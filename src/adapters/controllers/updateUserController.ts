import { Request, Response,  NextFunction } from 'express';
import { UpdateUserUseCase } from '../../application/useCases/updateUserUseCase';
import { FileUserRepository } from '../../infrastructure/fileUserRepository';

export async function updateUserController(req: Request, res: Response, next: NextFunction) {

  if (!req.params?.wallet_id) return next(new Error('No wallet_id provided'));
  if (!req.body) return next(new Error('No body provided'));

  try {
    const userRepository = new FileUserRepository();
    const updateUserUseCase = new UpdateUserUseCase(userRepository);
    const updatedUser = await updateUserUseCase.execute(req.params.wallet_id, req.body);
    res.json(updatedUser);
  } catch (e) {
    next(e);
  }
};
