import { User } from '../domain/user';

export interface Filters {
  page?: number,
  limit?: number,
  sortBy?: keyof User,
  sortDirection?: 'ascending' | 'descending',
}

export interface UserRepositoryInterface {
  findAll(filters?: Filters): Promise<User[]>,
  create(user: User): Promise<User>,
  update(id: string, user: Partial<User>): Promise<User>,
  delete(id: string): Promise<void>
};
