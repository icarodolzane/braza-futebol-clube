import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';
// import LoginValidations from '../middlewares/LoginValidation';

const matchesController = new MatchesController();
const matchesRouter = Router();

matchesRouter.get('/', (req: Request, res: Response) => {
  matchesController.getAllMatchesSorted(req, res);
});

export default matchesRouter;
