import { Request, Response } from 'express';
import UserService from '../services/Users/UsersService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(
    private userService: UserService,
  ) { }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const response = await this.userService.login(email, password);

    if (response.status !== 'SUCCESSFUL') {
      const status = mapStatusHTTP(response.status);
      return res.status(status).json(response.data);
    }

    return res.status(200).json(response.data);
  }
}
