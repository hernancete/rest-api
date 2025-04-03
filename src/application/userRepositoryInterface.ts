import { User } from '../domain/user';

export interface UserRepositoryInterface {
  findAll(): Promise<User[]>,
  create(user: User): Promise<User>,
  update(user: Partial<User>): Promise<User>,
  delete(id: string): Promise<string>
};
