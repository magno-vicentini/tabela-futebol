import { Router } from 'express';
import { LeaderboardController } from '../controllers';

const leaderboardRouter = Router();

const teamsController = new LeaderboardController();

leaderboardRouter.get('/home', async (req, res) => teamsController.tableHomeTeams(req, res));

export default leaderboardRouter;
