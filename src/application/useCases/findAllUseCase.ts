import { Filters, UserRepositoryInterface } from "../userRepositoryInterface";
import { User } from '../../domain/user';
import { InvalidInputError } from '../../domain/errors';


export class FindAllUseCase {

  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(filters?: any): Promise<User[]> {

    const curatedFilters: Filters = {};

    if (filters && filters.page && !isNaN(parseInt(filters.page))) {
      if (parseInt(filters.page) < 0) {
        throw new InvalidInputError('Invalid parameter');
      }
      curatedFilters.page = parseInt(filters.page);
    }
    if (filters && filters.limit && !isNaN(parseInt(filters.limit))) {
      if (parseInt(filters.limit) < 0) {
        throw new InvalidInputError('Invalid parameter');
      }
      curatedFilters.limit = parseInt(filters.limit);
    }

    return this.userRepository.findAll(curatedFilters);
  }

}
