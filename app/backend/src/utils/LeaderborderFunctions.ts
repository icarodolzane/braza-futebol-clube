import { StatsReturn } from '../Types/StatsReturn';
import { ITeams } from '../Interfaces/Teams/ITeams';
import { IMatches } from '../Interfaces/Matches/IMatches';

const victoryPoint = 3;
const drawPoint = 1;
const totalVictories = (id:number, matches:IMatches[]) :number => {
  const filterTeamHomeMatches = matches.filter((match: IMatches) => match.homeTeamId === id);
  const sumHomeVictories = filterTeamHomeMatches.reduce((acc, match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  const filterTeamAwayMatches = matches.filter((match: IMatches) => match.awayTeamId === id);
  const sumAwayVictories = filterTeamAwayMatches.reduce((acc, match) => {
    if (match.homeTeamGoals < match.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return sumHomeVictories + sumAwayVictories;
};

const totalGames = (id: number, matches: IMatches[]): number => {
  const filterTeamHomeMatches = matches.filter((match: IMatches) => match.homeTeamId === id);
  const filterTeamAwayMatches = matches.filter((match: IMatches) => match.awayTeamId === id);
  const sumHomeMatches = filterTeamHomeMatches.length;
  const sumAwayMatches = filterTeamAwayMatches.length;
  return sumHomeMatches + sumAwayMatches;
};

const totalDraws = (id: number, matches: IMatches[]): number => {
  const filterTeamHomeMatches = matches.filter((match) => match.homeTeamId === id);
  const filterTeamAwayMatches = matches.filter((match) => match.awayTeamId === id);
  const sumDrawsHome = filterTeamHomeMatches.reduce((acc, match) => {
    if (match.homeTeamGoals === match.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  const sumDrawsAway = filterTeamAwayMatches.reduce((acc, match) => {
    if (match.homeTeamGoals === match.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return sumDrawsHome + sumDrawsAway;
};

const totalLossesFunc = (id: number, matches: IMatches[]): number => {
  const filterTeamHomeMatches = matches.filter((team) => team.homeTeamId === id);
  const sumHomeLosses = filterTeamHomeMatches.reduce((acc, match) => {
    if (match.homeTeamGoals < match.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  const filterTeamAwayMatches = matches.filter((team) => team.awayTeamId === id);
  const sumAwayLosses = filterTeamAwayMatches.reduce((acc, match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return sumHomeLosses + sumAwayLosses;
};

const totalGoalsFavorFunc = (id: number, matches: IMatches[]): number => {
  const filteredHomeMatches = matches.filter((match) => match.homeTeamId === id);
  const totalHomeTeamGoals = filteredHomeMatches
    .reduce((acc, match) => acc + match.homeTeamGoals, 0);
  const filteredAwayMatches = matches.filter((match) => match.awayTeamId === id);
  const totalAwayTeamGoals = filteredAwayMatches
    .reduce((acc, match) => acc + match.awayTeamGoals, 0);
  return totalHomeTeamGoals + totalAwayTeamGoals;
};

const totalGoalsOwn = (id: number, matches: IMatches[]): number => {
  const filteredHomeMatches = matches.filter((match) => match.homeTeamId === id);
  const totalHomeTeamGoals = filteredHomeMatches
    .reduce((acc, match) => acc + match.awayTeamGoals, 0);
  const filteredAwayMatches = matches.filter((match) => match.awayTeamId === id);
  const totalAwayTeamGoals = filteredAwayMatches
    .reduce((acc, match) => acc + match.homeTeamGoals, 0);
  return totalHomeTeamGoals + totalAwayTeamGoals;
};

const classificationBoardCalc = (board: StatsReturn[]): StatsReturn[] => {
  const result = board.sort((a: StatsReturn, b: StatsReturn) => {
    if (a.totalPoints !== b.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    if (a.totalVictories !== b.totalVictories) {
      return b.totalVictories - a.totalVictories;
    }
    if (a.goalsBalance !== b.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    }
    return b.goalsFavor - a.goalsFavor;
  });
  return result;
};

const boardCalculator = (teams: ITeams[], matches: IMatches[]): StatsReturn[] => {
  const board = teams.map((team: ITeams) => ({
    name: team.teamName,
    totalPoints: totalVictories(team.id, matches) * victoryPoint
      + totalDraws(team.id, matches) * drawPoint,
    totalGames: totalGames(team.id, matches),
    totalVictories: totalVictories(team.id, matches),
    totalDraws: totalDraws(team.id, matches),
    totalLosses: totalLossesFunc(team.id, matches),
    goalsFavor: totalGoalsFavorFunc(team.id, matches),
    goalsOwn: totalGoalsOwn(team.id, matches),
    goalsBalance: totalGoalsFavorFunc(team.id, matches) - totalGoalsOwn(team.id, matches),
    efficiency: String(((
      ((totalVictories(team
        .id, matches) * victoryPoint) + (totalDraws(team.id, matches) * drawPoint)
      ) / (totalGames(team.id, matches) * victoryPoint)) * 100).toFixed(2)),
  }));
  const classification = classificationBoardCalc(board);
  return classification;
};

export default boardCalculator;
