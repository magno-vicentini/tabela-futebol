import { Router } from 'express';
import loginRouter from './loginRouter';

const routes = Router();

routes.use('/login', loginRouter);

export default routes;
