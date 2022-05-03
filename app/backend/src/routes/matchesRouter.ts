import { Router } from 'express';
import auth from '../middlewares/auth';
import { MatchesController } from '../controllers';
import valTeams from '../middlewares/valTeams';

const matchesRouter = Router();

const matchesController = new MatchesController();

matchesRouter.get('/', async (req, res) => matchesController.allMatches(req, res));

matchesRouter.post(
  '/',
  auth,
  valTeams,
  async (req, res) => matchesController.createMatch(req, res),
);

matchesRouter.patch('/:id/finish', async (req, res) => matchesController.updateProgress(req, res));

matchesRouter.patch('/:id', async (req, res) => matchesController.updateGoals(req, res));
export default matchesRouter;
