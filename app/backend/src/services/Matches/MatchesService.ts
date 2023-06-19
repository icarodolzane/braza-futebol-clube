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
}
