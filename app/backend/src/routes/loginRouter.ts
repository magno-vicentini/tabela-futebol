import { Router } from 'express';
import auth from '../middlewares/auth';
import { LoginController } from '../controllers';
import { valEmail, valPassword } from '../middlewares';

const login = Router();

const loginController = new LoginController();

login.post(
  '/',
  valEmail,
  valPassword,
  async (req, res) => loginController.login(req, res),
);

login.get(
  '/validate',
  auth,
  async (req, res) => LoginController.validateLogin(req, res),
);
export default login;
