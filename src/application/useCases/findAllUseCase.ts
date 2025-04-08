import { Filters, UserRepositoryInterface, MatchFilter } from "../userRepositoryInterface";
import { User } from '../../domain/user';
import { InvalidInputError } from '../../domain/errors';


export class FindAllUseCase {

  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(filters?: any): Promise<User[]> {

    const curatedFilters: Filters = {};
    curatePaginationFilters(filters, curatedFilters);
    curateSortingFilters(filters, curatedFilters);
    curateMatchingFilters(filters, curatedFilters);

    return this.userRepository.findAll(curatedFilters);
  }

}

function curatePaginationFilters(filters: any, curatedFilters: Filters) {
  if (filters && filters.page && !isNaN(parseInt(filters.page))) {
    if (parseInt(filters.page) < 0) {
      throw new InvalidInputError('Invalid filter');
    }
    curatedFilters.page = parseInt(filters.page);
  }
  if (filters && filters.limit && !isNaN(parseInt(filters.limit))) {
    if (parseInt(filters.limit) < 0) {
      throw new InvalidInputError('Invalid filter');
    }
    curatedFilters.limit = parseInt(filters.limit);
  }
}

function curateSortingFilters(filters: any, curatedFilters: Filters) {
  const sortables = [
    'wallet_id',
    'email',
    'name',
    'last_name',
    'sex_type',
    'dni',
    'birth_date',
    'created_at',
  ];
  const sortableDirections = ['ascending', 'descending'];
  if (filters && filters.sortBy) {
    if (!sortables.includes(filters.sortBy)) {
      throw new InvalidInputError('Invalid filter');
    }
    curatedFilters.sortBy = filters.sortBy;
    if (filters && filters.sortDirection) {
      if (!sortableDirections.includes(filters.sortDirection)) {
        throw new InvalidInputError('Invalid filter');
      }
      curatedFilters.sortDirection = filters.sortDirection;
    }
  }
}

function curateMatchingFilters(filters: any, curatedFilters: Filters) {

  if (!filters) return;

  const matchables = [
    'wallet_id',
    'email',
    'name',
    'last_name',
    'sex_type',
    'dni',
    'birth_date',
    'created_at',
  ];

  const match: MatchFilter = {};

  Object.keys(filters).forEach(f => {

    const matchRegex = new RegExp(/match\[(.+)\]/);
    const matchRegexResult = matchRegex.exec(f);
    if (matchRegexResult) {
      const field = matchRegexResult[1];
      if (field && matchables.includes(field)) {
        match[field] = filters[f];
      } else {
        throw new InvalidInputError('Invalid filter');
      }
    }
  });

  if (Object.keys(match).length) {
    curatedFilters.match = {...match}
  }
}
