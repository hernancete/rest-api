import { Request, Response,  NextFunction } from 'express';
import { CreateUserUseCase } from '../../application/useCases/createUserUseCase';
import { FileUserRepository } from '../../infrastructure/fileUserRepository';

export async function createUserController(req: Request, res: Response, next: NextFunction) {

  if (!req.body) return next(new Error('No body provided'));

  try {
    const userRepository = new FileUserRepository();
    const createUserUseCase = new CreateUserUseCase(userRepository);
    const createdUser = await createUserUseCase.execute(req.body);
    res.json(createdUser);
  } catch (e) {
    next(e);
  }
}
