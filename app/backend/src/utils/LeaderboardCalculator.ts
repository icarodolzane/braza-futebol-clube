import { IMatches } from '../Interfaces/Matches/IMatches';
import { StatsReturn } from '../Types/StatsReturn';
import { ITeamStats } from '../Interfaces/Teams/ITeamStats';

export default class LeaderboardCalculator {
  public teamStatsHomeOrAway = (path: string, teamMatches: IMatches[]): StatsReturn => {
    const wins = teamMatches.filter((match) =>
      (path === '/home'
        ? match.homeTeamGoals > match.awayTeamGoals
        : match.homeTeamGoals < match.awayTeamGoals));
    const draws = teamMatches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
    const losses = teamMatches.filter((match) =>
      (path === '/home'
        ? match.homeTeamGoals < match.awayTeamGoals
        : match.homeTeamGoals > match.awayTeamGoals));
    const goalsFavor = teamMatches.reduce((acc, curr) => acc
      + (path === '/home' ? curr.homeTeamGoals : curr.awayTeamGoals), 0);
    const goalsOwn = teamMatches.reduce((acc, curr) => acc
      + (path === '/home' ? curr.awayTeamGoals : curr.homeTeamGoals), 0);
    return { wins, draws, losses, goalsFavor, goalsOwn };
  };

  public teamStats = (id: number, teamMatches: IMatches[]): StatsReturn => {
    const matchesHome = teamMatches.filter((match) => match.homeTeamId === id);
    const matchesAway = teamMatches.filter((match) => match.awayTeamId === id);
    const wins = matchesHome.filter((match) => match.homeTeamGoals > match.awayTeamGoals)
      .concat(matchesAway.filter((match) => match.awayTeamGoals > match.homeTeamGoals));
    const draws = teamMatches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
    const losses = matchesHome.filter((match) => match.homeTeamGoals < match.awayTeamGoals)
      .concat(matchesAway.filter((match) => match.awayTeamGoals < match.homeTeamGoals));
    const goalsFavor = matchesHome.reduce((acc, curr) => acc + curr.homeTeamGoals, 0)
      + matchesAway.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
    const goalsOwn = matchesHome.reduce((acc, curr) => acc + curr.awayTeamGoals, 0)
      + matchesAway.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
    return { wins, draws, losses, goalsFavor, goalsOwn };
  };

  public teamStatsReport = (name: string, teamStats: StatsReturn, teamMatches: IMatches[]):
  ITeamStats => ({
    name,
    totalPoints: teamStats.wins.length * 3 + teamStats.draws.length,
    totalGames: teamMatches.length,
    totalVictories: teamStats.wins.length,
    totalDraws: teamStats.draws.length,
    totalLosses: teamStats.losses.length,
    goalsFavor: teamStats.goalsFavor,
    goalsOwn: teamStats.goalsOwn,
    goalsBalance: teamStats.goalsFavor - teamStats.goalsOwn,
    efficiency: ((((teamStats.wins.length * 3) + (teamStats.draws.length))
        / (teamMatches.length * 3)) * 100).toFixed(2).toString(),
  });

  public sortStatsReport = (statsReport: ITeamStats[]): ITeamStats[] => {
    statsReport.sort((teamA, teamB) => {
      if (teamA.totalPoints !== teamB.totalPoints) return teamB.totalPoints - teamA.totalPoints;
      if (teamA.totalVictories !== teamB.totalVictories) {
        return teamB.totalVictories - teamA.totalVictories;
      }
      if (teamA.goalsBalance !== teamB.goalsBalance) return teamB.goalsBalance - teamA.goalsBalance;
      return teamB.goalsFavor - teamA.goalsFavor;
    });
    return statsReport;
  };
}
