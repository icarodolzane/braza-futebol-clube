import { Request, Response } from 'express';
import MatchesService from '../services/Matches/MatchesService';
import TeamsModel from '../models/TeamsModel';
import mapStatusHTTP from '../utils/mapStatusHTTP';

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

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    const response = await this.matchesService.updateMatch(Number(id), data);
    return res.status(mapStatusHTTP(response.status)).json(response.data);
  }

  public async createMatch(req: Request, res: Response) {
    const data = req.body;
    const { homeTeamId, awayTeamId } = data;

    if (homeTeamId === awayTeamId) {
      return res
        .status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const homeTeam = await this.teamsModel.findById(homeTeamId);
    const awayTeam = await this.teamsModel.findById(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    const newMatch = await this.matchesService.createMatch(data);
    return res.status(201).json(newMatch.data);
  }
}
