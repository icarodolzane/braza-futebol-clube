import { Request, Response } from 'express';

import TeamsService from '../services/TeamsService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) {}

  public async getAllTeams(_req: Request, res: Response)
    :Promise<Response> {
    const allTeams = await this.teamsService.getAllTeams();

    return res.status(200).json(allTeams.data);
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;
    const response = await this.teamsService.getById(Number(id));
    if (response.status !== 'SUCCESSFUL') {
      return res
        .status(mapStatusHTTP(response.status))
        .json(response.data);
    }
    return res.status(200).json(response.data);
  }
}
