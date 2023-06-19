import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';
// import LoginValidations from '../middlewares/LoginValidation';
import TeamsModel from '../models/TeamsModel';
import MatchesService from '../services/Matches/MatchesService';

const matchesService = new MatchesService();
const teamsModel = new TeamsModel();
const matchesController = new MatchesController(matchesService, teamsModel);
const matchesRouter = Router();

matchesRouter.get('/', (req: Request, res: Response) => {
  matchesController.getAllMatchesSorted(req, res);
});

export default matchesRouter;
