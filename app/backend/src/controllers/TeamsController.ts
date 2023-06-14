import { Request, Response } from 'express';

import TeamsService from '../services/TeamsService';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) {}

  public async getAllTeams(_req: Request, res: Response)
    :Promise<Response> {
    const allTeams = await this.teamsService.getAllTeams();

    return res.status(200).json(allTeams.data);
  }
}
