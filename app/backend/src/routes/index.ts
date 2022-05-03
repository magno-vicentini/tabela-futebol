import { Router } from 'express';
import loginRouter from './loginRouter';
import teamsRouter from './teamsRouter';

const routes = Router();

routes.use('/login', loginRouter);
routes.use('/teams', teamsRouter);

export default routes;
