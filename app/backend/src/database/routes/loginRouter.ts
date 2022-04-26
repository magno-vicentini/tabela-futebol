import { Router } from 'express';
import { LoginController } from '../controllers';
import { valEmail, valPassword } from '../middlewares';

const login = Router();

const loginController = new LoginController();

login.post(
  '/',
  valEmail,
  valPassword,
  async (req, res) => loginController.validateLogin(req, res),
);
export default login;
