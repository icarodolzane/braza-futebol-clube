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

    if (!user) return { status: 'UNAUTHORIZED', data: { message: 'Email or password invalid' } };

    const isValid = await this.encrypts.compare(password, user.password);

    if (!isValid) return { status: 'UNAUTHORIZED', data: { message: 'Email or password invalid' } };

    const token = this.tokenGenerator.generate(user);

    return { status: 'SUCCESSFUL', data: { token } };
  }
}
