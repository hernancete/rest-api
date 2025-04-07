import { Request, Response,  NextFunction } from 'express';
import { DeleteUserUseCase } from '../../application/useCases/deleteUserUseCase';
import { FileUserRepository } from '../../infrastructure/fileUserRepository';

const message = 'User deleted successfully';

export function deleteUserController(req: Request, res: Response, next: NextFunction) {

  if (!req.params?.wallet_id) return next(new Error('Invalid wallet_id'));

  const { wallet_id } = req.params;
  const userRepository = new FileUserRepository();
  const deleteUserUseCase = new DeleteUserUseCase(userRepository);

  return deleteUserUseCase.execute(wallet_id, (error: Error | null) => {
    if (error) return next(error);
    return res.json({ message });
  });

}
