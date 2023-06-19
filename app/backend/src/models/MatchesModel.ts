import SequelizeTeams from '../database/models/SequelizeTeam';
import { IMatches } from '../Interfaces/Matches/IMatches';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import SequelizeMatches from '../database/models/SequelizeMatch';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;
  findAll(): Promise<IMatches[]> {
    return this.model.findAll({
      include: [
        {
          model: SequelizeTeams,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: SequelizeTeams,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
  }

  async getAllMatchesSorted(progress: boolean)
    : Promise<IMatches[]> {
    const allMatches = await this.model.findAll(
      {
        where: {
          inProgress: progress,
        },
        include: [
          {
            model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'],
          },
          {
            model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'],
          },
        ],
      },
    );
    return allMatches;
  }

  async update(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<unknown> {
    return this.model.update(
      {
        homeTeamGoals,
        awayTeamGoals,
      },
      { where: { id } },
    );
  }

  async create(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<unknown> {
    const newMatch = this
      .model
      .create(
        {
          homeTeamId,
          awayTeamId,
          homeTeamGoals,
          awayTeamGoals,
          inProgress: true,
        },
      );
    return newMatch;
  }

  async finishMatch(id: number): Promise<unknown> {
    return this.model.update(
      { inProgress: false },
      { where: { id } },
    );
  }
}
