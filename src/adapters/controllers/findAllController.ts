import { Request, Response } from 'express';
import { FindAllUseCase } from '../../application/useCases/findAllUseCase';
import { FileUserRepository } from '../../infrastructure/fileUserRepository';

export async function findAllController(req: Request, res: Response) {

  const { page, limit, sortBy, sortDirection } = req.query || {};

  const filters: { [key: string]: any } = {
    ...(limit ? { limit } : {}),
    ...(page ? { page } : {}),
    ...(sortBy ? { sortBy } : {}),
    ...(sortDirection ? { sortDirection } : {}),
  };

  Object.keys(req.query || {}).forEach(param => {
    if (/match\[.+\]/.test(param)) {
      filters[param] = req.query[param];
    }
  });

  const userRepository = new FileUserRepository();
  const findAllUseCase = new FindAllUseCase(userRepository);
  const users = await findAllUseCase.execute(filters);

  res.json(users);
}
