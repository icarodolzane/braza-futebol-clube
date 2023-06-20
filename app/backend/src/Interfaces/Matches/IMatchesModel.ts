import { StatsReturn } from '../../Types/StatsReturn';
import { IMatches } from './IMatches';

export interface IMatchesModel {

  findAll(): Promise<IMatches[]>,
  getAllMatchesSorted(progress: boolean): Promise<IMatches[]>,
  update(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<unknown>,
  finishMatch(id: number): Promise<unknown>,
  create(homeTeamId: number,
    awayTeamId: number, homeTeamGoals: number, awayTeamGoals: number): Promise<unknown>,
  leader(): Promise<StatsReturn[]>,
}
