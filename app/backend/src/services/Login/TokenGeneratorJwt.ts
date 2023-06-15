import * as jwt from 'jsonwebtoken';
import { IUsers } from '../../Interfaces/Users/IUsers';
import { TokenGenerator } from '../../Interfaces/Login/TokenGenerator';

export default class TokenGeneratorJwt implements TokenGenerator {
  private jwt = jwt;
  generate(user: IUsers): string {
    const token = this.jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'jwt_secret');
    return token;
  }
}
