import { Router } from 'express';
import TokenGeneratorJwt from '../services/Login/TokenGeneratorJwt';
import UsersService from '../services/Users/UsersService';
import UsersController from '../controllers/UsersController';
import UserModel from '../models/UserModel';
import EncrypterBcryptService from '../services/Login/EncrypterBcryptService';
import LoginValidation from '../middlewares/LoginValidation';

const userModel = new UserModel();
const encrypter = new EncrypterBcryptService();
const tokenGenerator = new TokenGeneratorJwt();
const userService = new UsersService(userModel, tokenGenerator, encrypter);
const userController = new UsersController(userService);

const userRouter = Router();

userRouter
  .post('/', LoginValidation.validateLogin, (req, res) => userController.login(req, res));

export default userRouter;
