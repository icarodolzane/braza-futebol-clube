import MatchesModel from '../../models/MatchesModel';
import TeamsModel from '../../models/TeamsModel';
import { IMatches } from '../../Interfaces/Matches/IMatches';
import { ITeamStats } from '../../Interfaces/Teams/ITeamStats';
import { ServiceResponse } from '../../Interfaces/ServiceResponse';
import LeaderboardCalculator from '../../utils/LeaderboardCalculator';

export default class LeaderboardService {
  private teamsModel = new TeamsModel();
  private matchesModel = new MatchesModel();
  private getLeaderBoard = new LeaderboardCalculator();

  public getStatsHomeOrAway = async (path: string): Promise<ServiceResponse<ITeamStats[]>> => {
    const matches = await this.matchesModel.getAllMatchesSorted(false);
    const teams = await this.teamsModel.findAll();
    const teamsStatsRaw = await Promise.all(teams.map(async (team) => {
      const name = team.teamName;
      let teamMatches: IMatches[] = [];
      if (path === '/home') {
        teamMatches = matches.filter((match) => match.homeTeamId === team.id);
      } else teamMatches = matches.filter((match) => match.awayTeamId === team.id);
      const teamStats = this.getLeaderBoard.teamStatsHomeOrAway(path, teamMatches);
      const statsReport = this.getLeaderBoard.teamStatsReport(name, teamStats, teamMatches);
      return statsReport;
    }));

    const teamsStats = this.getLeaderBoard.sortStatsReport(teamsStatsRaw);

    return { status: 'SUCCESSFUL', data: teamsStats };
  };

  public getStatsAll = async (): Promise<ServiceResponse<ITeamStats[]>> => {
    const matches = await this.matchesModel.getAllMatchesSorted(false);
    const teams = await this.teamsModel.findAll();
    const teamsStatsRaw = await Promise.all(teams.map(async (team) => {
      const name = team.teamName;
      const teamMatches: IMatches[] = matches
        .filter((match) => match.homeTeamId === team.id || match.awayTeamId === team.id);
      const teamStats = this.getLeaderBoard.teamStats(team.id, teamMatches);
      const statsReport = this.getLeaderBoard.teamStatsReport(name, teamStats, teamMatches);
      return statsReport;
    }));

    const teamsStats = this.getLeaderBoard.sortStatsReport(teamsStatsRaw);

    return { status: 'SUCCESSFUL', data: teamsStats };
  };
}
