import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  const emailRegex = /\S+@\S+.\S\.+com/;

  if (!email) {
    return res.status(400).json({
      message: 'All fields must be filled',
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  next();
};
