import { IUsers } from '../Users/IUsers';

export interface TokenGenerator {
  generate(user: IUsers): string;
}
