import { IUserModel } from '../Interfaces/Users/IUserModel';
import SequelizeUser from '../database/models/SequelizeUser';
import { IUsers,
} from '../Interfaces/Users/IUsers';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findByEmail(email: string): Promise<IUsers | null> {
    const user = await this.model.findOne({ where: { email } });

    if (!user) return null;

    const { id, username, role, password }: IUsers = user;
    return { id, username, role, email, password };
  }
}
