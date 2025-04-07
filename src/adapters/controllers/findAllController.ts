import { Request, Response } from 'express';
import { FindAllUseCase } from '../../application/useCases/findAllUseCase';
import { FileUserRepository } from '../../infrastructure/fileUserRepository';

export async function findAllController(req: Request, res: Response) {

  const { page, limit } = req.query || {};

  const filters = {
    ...(limit ? { limit } : {}),
    ...(page ? { page } : {}),
  };

  const userRepository = new FileUserRepository();
  const findAllUseCase = new FindAllUseCase(userRepository);
  const users = await findAllUseCase.execute(filters);

  res.json(users);
}
