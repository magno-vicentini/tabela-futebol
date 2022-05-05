import { Router } from 'express';
import { LeaderboardController } from '../controllers';

const leaderboardRouter = Router();

const teamsController = new LeaderboardController();

leaderboardRouter.get('/home', async (req, res) => teamsController.tableHomeTeams(req, res));

leaderboardRouter.get('/away', async (req, res) => teamsController.tableAwayTeams(req, res));

leaderboardRouter.get('/', async (req, res) => teamsController.tableGeneral(req, res));

export default leaderboardRouter;
