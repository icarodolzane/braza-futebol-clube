import { Request, Response } from 'express';
import MatchesService from '../services/Matches/MatchesService';
import TeamsModel from '../models/TeamsModel';

export default class TeamController {
  constructor(
    private matchesService = new MatchesService(),
    private teamsModel = new TeamsModel(),
  ) {}

  public async getAllMatchesSorted(req: Request, res: Response) {
    const { inProgress } = req.query;
    const response = await this.matchesService.getAllMatches();

    if (inProgress === 'false') {
      const match = await this.matchesService.getAllMatchesSorted(false);
      return res.status(200).json(match.data);
    }

    if (inProgress === 'true') {
      const match = await this.matchesService.getAllMatchesSorted(true);
      return res.status(200).json(match.data);
    }
    return res.status(200).json(response.data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const response = await this.matchesService.finishMatch(Number(id));
    return res.status(200).json(response.data);
  }
}
