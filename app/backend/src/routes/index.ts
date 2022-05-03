import { Router } from 'express';
import loginRouter from './loginRouter';
import matchesRouter from './matchesRouter';
import teamsRouter from './teamsRouter';

const routes = Router();

routes.use('/login', loginRouter);
routes.use('/teams', teamsRouter);
routes.use('/matches', matchesRouter);

export default routes;
