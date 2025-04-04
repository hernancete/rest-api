import { User } from '../domain/user';

export interface UserRepositoryInterface {
  findAll(): Promise<User[]>,
  create(user: User): Promise<User>,
  update(id: string, user: Partial<User>): Promise<User>,
  delete(id: string): Promise<void>
};
