import { IMatches } from '../Interfaces/Matches/IMatches';

export type StatsReturn = {
  wins: IMatches[];
  draws: IMatches[];
  losses: IMatches[];
  goalsFavor: number;
  goalsOwn: number;
};
