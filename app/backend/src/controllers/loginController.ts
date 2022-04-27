import * as jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';
import { Request, Response } from 'express';
import { UserService } from '../services';

export default class LoginController {
  private jwtConfig: jwt.SignOptions = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async validateLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    console.log('console dados', email, password);
    const user = await this.userService.findUser(email, password);

    if (!user) {
      return res.status(401).json({ error: 'Incorrect email or password' });
    }

    const JWT_SECRET = await fs.readFile('jwt.evaluation.key', 'utf-8');

    console.log('secret', JWT_SECRET);
    const payload = {
      user,
    };

    const token = jwt.sign({ payload }, JWT_SECRET, this.jwtConfig);
    return res.status(200).json({
      user,
      token,
    });
  }
}
