import { v4 } from 'uuid';
import { UserRepositoryInterface } from "../userRepositoryInterface";
import { User } from '../../domain/user';
import { InvalidInputError } from '../../domain/errors';

export class CreateUserUseCase {

  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(user: Partial<User>): Promise<User> {

    if (!user.email) throw new InvalidInputError('Invalid email');
    if (!user.name) throw new InvalidInputError('Invalid name');
    if (!user.last_name) throw new InvalidInputError('Invalid last_name');
    if (!user.dni) throw new InvalidInputError('Invalid dni');

    const wallet_id = v4();
    const now = new Date();
    const created_at = now.toISOString();

    const newUser = { ...user, wallet_id, created_at };

    const created = await this.userRepository.create(newUser as User);
    return created;
  }

}
