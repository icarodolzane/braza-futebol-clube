import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import LoginValidations from '../middlewares/LoginValidation';
import TeamsModel from '../models/TeamsModel';
import MatchesService from '../services/Matches/MatchesService';

const matchesService = new MatchesService();
const teamsModel = new TeamsModel();
const matchesController = new MatchesController(matchesService, teamsModel);
const matchesRouter = Router();

matchesRouter.get('/', (req: Request, res: Response) => {
  matchesController.getAllMatchesSorted(req, res);
});

matchesRouter.patch(
  '/:id/finish',
  LoginValidations.validateToken,
  async (req: Request, res: Response) => matchesController.finishMatch(req, res),
);

matchesRouter.patch(
  '/:id',
  LoginValidations.validateToken,
  async (req: Request, res: Response) => matchesController.updateMatch(req, res),
);

matchesRouter.post(
  '/',
  LoginValidations.validateToken,
  async (req: Request, res: Response) => matchesController.createMatch(req, res),
);

export default matchesRouter;
