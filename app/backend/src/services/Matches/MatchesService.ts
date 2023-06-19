import { IMatches } from '../../Interfaces/Matches/IMatches';
import { ServiceResponse } from '../../Interfaces/ServiceResponse';
import { IMatchesModel } from '../../Interfaces/Matches/IMatchesModel';
import MatchesModel from '../../models/MatchesModel';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) {}

  public async getAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.findAll();
    return {
      status: 'SUCCESSFUL',
      data: allMatches,
    };
  }

  public async getAllMatchesSorted(progress: boolean): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this
      .matchesModel
      .getAllMatchesSorted(progress);
    return {
      status: 'SUCCESSFUL',
      data: allMatches,
    };
  }

  public async finishMatch(id: number): Promise<ServiceResponse<unknown>> {
    await this.matchesModel.finishMatch(id);
    return {
      status: 'SUCCESSFUL',
      data: { message: 'Finished' },
    };
  }

  public async updateMatch(id: number, data: IMatches): Promise<ServiceResponse<unknown>> {
    await this.matchesModel.update(id, data.homeTeamGoals, data.awayTeamGoals);
    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }
}
