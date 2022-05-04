import { Router } from 'express';
import leaderboardRouter from './leaderboardRouter';
import loginRouter from './loginRouter';
import matchesRouter from './matchesRouter';
import teamsRouter from './teamsRouter';

const routes = Router();

routes.use('/login', loginRouter);
routes.use('/teams', teamsRouter);
routes.use('/matches', matchesRouter);
routes.use('/leaderboard', leaderboardRouter);
export default routes;
