import { UserRepositoryInterface } from "./userRepositoryInterface";
import { User } from '../domain/user';

export class FindAllUseCase {

  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }

}
