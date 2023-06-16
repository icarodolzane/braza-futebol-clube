import { Request, Response, NextFunction } from 'express';
import regex from '../utils/Constants';

class LoginValidations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (typeof password !== 'string' || password.length <= 6 || !regex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return next();
  }
}

export default LoginValidations;
