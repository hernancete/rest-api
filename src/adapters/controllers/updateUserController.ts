import { Request, Response,  NextFunction } from 'express';
import { UpdateUserUseCase } from '../../application/updateUserUseCase';
import { FileUserRepository } from '../../infrastructure/fileUserRepository';

export async function updateUserController(req: Request, res: Response, next: NextFunction) {

  if (!req.body) return next(new Error('No body provided'));

  try {
    const userRepository = new FileUserRepository();
    const updateUserUseCase = new UpdateUserUseCase(userRepository);
    const updatedUser = await updateUserUseCase.execute(req.body);
    res.json(updatedUser);
  } catch (e) {
    next(e);
  }
};
