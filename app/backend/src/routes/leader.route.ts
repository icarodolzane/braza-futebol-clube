import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatchesController';

const matchController = new MatchesController();

const leaderBoardRouter = Router();

leaderBoardRouter.get(
  '/home',
  (req: Request, res: Response) => matchController.leaderBoard(req, res),
);

export default leaderBoardRouter;
