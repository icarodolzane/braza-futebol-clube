import { IUsers } from '../../Interfaces/Users/IUsers';
import { IUserModel } from '../../Interfaces/Users/IUserModel';
import { TokenGenerator } from '../../Interfaces/Login/TokenGenerator';
import { Encrypter } from '../../Interfaces/Login/Encrypter';
import { ServiceResponse } from '../../Interfaces/ServiceResponse';

export default class UserService {
  constructor(
    private userModel: IUserModel,
    private tokenGenerator: TokenGenerator,
    private encrypts: Encrypter,
  ) {}

  public async login(email: string, password: string): Promise<ServiceResponse<{ token: string }>> {
    const user = await this.userModel.findByEmail(email);

    if (!user) return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };

    const isValid = await this.encrypts.compare(password, user.password);

    if (!isValid) {
      return {
        status: 'UNAUTHORIZED',
        data: { message: 'Invalid email or password' } };
    }

    const token = this.tokenGenerator.generate(user);

    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async getRole(token: string): Promise<ServiceResponse<{ role: IUsers['role'] }>> {
    const user = this.tokenGenerator.decode(token);
    console.log(user);
    const { id } = user;
    const userRole = await this.userModel.findById(id);
    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Token must be a valid' } };
    }
    if (!userRole?.role) {
      return { status: 'UNAUTHORIZED', data: { message: 'Token must be a valid' } };
    }
    const { role } = userRole;
    return { status: 'SUCCESSFUL', data: { role } };
  }
}
