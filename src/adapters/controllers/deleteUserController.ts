import { Request, Response,  NextFunction } from 'express';
import { DeleteUserUseCase } from '../../application/useCases/deleteUserUseCase';
import { FileUserRepository } from '../../infrastructure/fileUserRepository';

const message = 'User deleted successfully';

export async function deleteUserController(req: Request, res: Response, next: NextFunction) {

  if (!req.params?.wallet_id) return next(new Error('Invalid wallet_id'));

  try {
    const { wallet_id } = req.params;
    const userRepository = new FileUserRepository();
    const deleteUserUseCase = new DeleteUserUseCase(userRepository);
    await deleteUserUseCase.execute(wallet_id);
    res.json({ message });
  } catch (e) {
    next(e);
  }
}
