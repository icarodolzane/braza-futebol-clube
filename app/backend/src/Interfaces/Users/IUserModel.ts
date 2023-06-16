import { IUsers } from './IUsers';

export interface IUserModel {
  findByEmail(email: string): Promise<IUsers | null>;
  findById(id: number): Promise<IUsers | null>;
}
