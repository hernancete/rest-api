import { UserRepositoryInterface } from "../userRepositoryInterface";
import { InvalidInputError } from '../../domain/errors';

export class DeleteUserUseCase {

  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(wallet_id: string): Promise<void> {

    if (!wallet_id) throw new InvalidInputError('Invalid wallet_id');

    await this.userRepository.delete(wallet_id);
  }

}
