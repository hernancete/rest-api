import { Request, Response } from 'express';
import { CreateUserUseCase } from '../application/createUserUseCase';
import { FileUserRepository } from '../infrastructure/fileUserRepository';

export async function createUserController(req: Request, res: Response) {

  const userRepository = new FileUserRepository();
  const createUserUseCase = new CreateUserUseCase(userRepository);
  const createdUser = await createUserUseCase.execute(req.body);

  res.json(createdUser);
}
