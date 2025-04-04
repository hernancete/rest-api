import { Request, Response,  NextFunction } from 'express';
import { CreateUserUseCase } from '../../application/useCases/createUserUseCase';
import { FileUserRepository } from '../../infrastructure/fileUserRepository';

export function createUserController(req: Request, res: Response, next: NextFunction) {

  if (!req.body) return next(new Error('No body provided'));

  const userRepository = new FileUserRepository();
  const createUserUseCase = new CreateUserUseCase(userRepository);

  return createUserUseCase.execute(req.body)
    .then(createdUser => {
      res.json(createdUser);
    })
    .catch(e => {
      next(e);
    });
}
