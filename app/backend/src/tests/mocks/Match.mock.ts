import { IMatches } from '../../Interfaces/Matches/IMatches';

const matches: IMatches[] = [
  { id: 1, awayTeamGoals: 1, awayTeamId: 1, homeTeamGoals: 1, homeTeamId: 2, inProgress: false },
]

const sequelizeMatches = matches.map((match) => (
  {
    awayTeamGoals: match.awayTeamGoals,
      awayTeamId: match.awayTeamId,
      homeTeamGoals: match.homeTeamGoals,
      homeTeamId: match.homeTeamId,
      id: match.id,
      inProgress: match.inProgress,
 }));

const match = matches[0];
const sequelizeMatch = sequelizeMatches[0];

export default {
  match,
  matches,
  sequelizeMatch,
  sequelizeMatches,
}