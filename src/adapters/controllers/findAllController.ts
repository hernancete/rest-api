import { Request, Response } from 'express';
import { FindAllUseCase } from '../../application/useCases/findAllUseCase';
import { FileUserRepository } from '../../infrastructure/fileUserRepository';

export async function findAllController(req: Request, res: Response) {

  const { page, limit, sortBy, sortDirection } = req.query || {};

  const filters = {
    ...(limit ? { limit } : {}),
    ...(page ? { page } : {}),
    ...(sortBy ? { sortBy } : {}),
    ...(sortDirection ? { sortDirection } : {}),
  };

  const userRepository = new FileUserRepository();
  const findAllUseCase = new FindAllUseCase(userRepository);
  const users = await findAllUseCase.execute(filters);

  res.json(users);
}
