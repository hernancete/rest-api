import { v4 } from 'uuid';
import { UserRepositoryInterface } from "../userRepositoryInterface";
import { User } from '../../domain/user';
import { InvalidInputError } from '../../domain/errors';

export class CreateUserUseCase {

  constructor(private userRepository: UserRepositoryInterface) {}

  execute(user: Partial<User>): Promise<User> {

    return new Promise((resolve, reject) => {

      if (!user.email) return reject(new InvalidInputError('Invalid email'));
      if (!user.name) return reject(new InvalidInputError('Invalid name'));
      if (!user.last_name) return reject(new InvalidInputError('Invalid last_name'));
      if (!user.dni) return reject(new InvalidInputError('Invalid dni'));

      const wallet_id = v4();
      const now = new Date();
      const created_at = now.toISOString();

      const newUser = { ...user, wallet_id, created_at };

      this.userRepository.create(newUser as User)
        .then(created => resolve(created))
        .catch(e => reject(e));
    });
  }

}
