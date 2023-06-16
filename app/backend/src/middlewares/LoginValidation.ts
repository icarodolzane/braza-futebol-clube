import { Request, Response, NextFunction } from 'express';
import regex from '../utils/Constants';
import TokenGeneratorJwt from '../services/Login/TokenGeneratorJwt';

class LoginValidations {
  static tokenGenerator: TokenGeneratorJwt = new TokenGeneratorJwt();
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

  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).json({ message: 'Token not found' });
      }
      LoginValidations.tokenGenerator.verify(authorization);
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}

export default LoginValidations;
