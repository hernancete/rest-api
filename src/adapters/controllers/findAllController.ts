import { Request, Response } from 'express';
import { FindAllUseCase } from '../../application/useCases/findAllUseCase';
import { FileUserRepository } from '../../infrastructure/fileUserRepository';

export async function findAllController(req: Request, res: Response) {

  const userRepository = new FileUserRepository();
  const findAllUseCase = new FindAllUseCase(userRepository);
  const users = await findAllUseCase.execute();

  res.json(users);
}
