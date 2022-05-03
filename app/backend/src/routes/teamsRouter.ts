import { Router } from 'express';
import { TeamsController } from '../controllers';

const teamsRouter = Router();

const teamsController = new TeamsController();

teamsRouter.get('/', async (req, res) => teamsController.allTeams(req, res));

teamsRouter.get('/:id', async (req, res) => teamsController.teamById(req, res));

export default teamsRouter;
