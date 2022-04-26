import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({
      error: 'All fields must be filled',
    });
  }

  if (password.length <= 6) {
    return res.status(422).json({
      error: 'Password must be longer than 6 characters',
    });
  }
  next();
};
