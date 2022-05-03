import { Router } from 'express';
import auth from '../middlewares/auth';
import { MatchesController } from '../controllers';

const matchesRouter = Router();

const matchesController = new MatchesController();

matchesRouter.get('/', async (req, res) => matchesController.allMatches(req, res));

matchesRouter.post(
  '/',
  auth,
  async (req, res) => matchesController.createMatche(req, res),
);
export default matchesRouter;
