import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/LeaderborderController';

const leaderBoardRouter = Router();
const leaderboardController = new LeaderboardController();

leaderBoardRouter.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getStatsHomeOrAway(req, res),
);

leaderBoardRouter.get(
  '/away',
  (req: Request, res: Response) => leaderboardController.getStatsHomeOrAway(req, res),
);

leaderBoardRouter
  .get('/', (req: Request, res: Response) => leaderboardController.getStatsAll(req, res));
export default leaderBoardRouter;
