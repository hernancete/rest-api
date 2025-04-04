import { UserRepositoryInterface } from "../userRepositoryInterface";
import { User } from '../../domain/user';
import { InvalidInputError } from '../../domain/errors';

export class UpdateUserUseCase {

  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(wallet_id: string, user: Partial<User>): Promise<User> {

    if (!wallet_id) throw new InvalidInputError('Invalid wallet_id');

    const updateUser = {
      ...(user.email ? { email: user.email } : {}),
      ...(user.name ? { name: user.name } : {}),
      ...(user.last_name ? { last_name: user.last_name } : {}),
      ...(user.sex_type ? { sex_type: user.email } : {}),
      ...(user.dni ? { dni: user.dni } : {}),
      ...(user.birth_date ? { birth_date: user.birth_date } : {}),
    }

    const updated = await this.userRepository.update(wallet_id, updateUser);
    return updated;
  }

}
