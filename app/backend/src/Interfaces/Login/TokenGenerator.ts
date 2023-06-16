import { JwtPayload } from 'jsonwebtoken';
import { IUsers } from '../Users/IUsers';

export interface TokenGenerator {
  generate(user: IUsers): string;
  verify(token: string): JwtPayload | string;
  decode(token: string): IUsers;
}
