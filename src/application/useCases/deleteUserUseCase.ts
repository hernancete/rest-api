import { UserRepositoryInterface } from "../userRepositoryInterface";
import { InvalidInputError } from '../../domain/errors';

export class DeleteUserUseCase {

  constructor(private userRepository: UserRepositoryInterface) {}

  execute(wallet_id: string, cb: Function) {

    // if (!wallet_id) throw new InvalidInputError('Invalid wallet_id');
    // await this.userRepository.delete(wallet_id);

    if (!wallet_id) return cb(new InvalidInputError('Invalid wallet_id'));

    return this.userRepository.delete(wallet_id)
      .then(r => cb(null))
      .catch(e => cb(e));
  }

}
