import SequelizeTeams from '../database/models/SequelizeTeam';

import { ITeams } from '../Interfaces/Teams/ITeams';

import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeams;

  async findAll(): Promise<ITeams[]> {
    const allTeams = await this.model.findAll();
    return allTeams.map((team) => team);
  }
}
