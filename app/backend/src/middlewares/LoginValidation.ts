import { Request, Response, NextFunction } from 'express';

class LoginValidations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (password.length <= 6) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    return next();
  }
}

export default LoginValidations;
