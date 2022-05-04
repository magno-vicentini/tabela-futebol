import ILeaderboard from '../interfaces/ILeaderBoard';
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';

export default class LeaderboardService {
  private teamModel = TeamsModel;

  private matchesModel = MatchesModel;

  public leaderboard: ILeaderboard[] = [];

  private teamStatistics: ILeaderboard;

  constructor() {
    this.teamStatistics = LeaderboardService.resetTable();
    this.classification();
  }

  static resetTable() {
    const table = {
      name: '',
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    };
    return table;
  }

  get homeLeaderBoard() {
    return this.leaderboard.sort((a, b) => b.goalsOwn - a.goalsOwn)
      .sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => b.totalVictories - a.totalVictories)
      .sort((a, b) => b.totalPoints - a.totalPoints);
  }

  public async classification(): Promise<void> {
    const allTeams = await this.teamModel.findAll();
    const allMatches = await this.matchesModel.findAll({ where: { inProgress: false } });
    allTeams.forEach((team) => {
      allMatches.forEach((match) => {
        if (team.id === match.homeTeam) {
          this.teamStatistics.goalsFavor += match.homeTeamGoals;
          this.teamStatistics.goalsOwn += match.awayTeamGoals;
          this.teamStatistics.totalGames += 1;
          this.gameResults(match.homeTeamGoals, match.awayTeamGoals);
        }
      });
      this.teamStatistics.name = team.teamName;
      this.teamStatistics.goalsBalance = this.teamStatistics.goalsFavor
      - this.teamStatistics.goalsOwn;
      this.efficiency();
      this.leaderboard = [...this.leaderboard, this.teamStatistics];
      this.teamStatistics = LeaderboardService.resetTable();
    });
  }

  public gameResults(homeTeamGoals: number, awayTeamGoals: number) {
    if (homeTeamGoals === awayTeamGoals) {
      this.teamStatistics.totalDraws += 1;
      this.teamStatistics.totalPoints += 1;
    }
    if (homeTeamGoals > awayTeamGoals) {
      this.teamStatistics.totalVictories += 1;
      this.teamStatistics.totalPoints += 3;
    }
    if (homeTeamGoals < awayTeamGoals) {
      this.teamStatistics.totalLosses += 1;
    }
  }

  public efficiency() {
    console.log(this.leaderboard);
    const operation = ((this
      .teamStatistics.totalPoints / (this.teamStatistics.totalGames * 3)) * 100);

    this.teamStatistics.efficiency = Number(operation.toFixed(2));
  }
}

// const operation = (
//   (teamStatistics.totalPoints / (teamStatistics.totalGames * 3)) * 100);
// teamStatistics.efficiency = Number(operation.toFixed(2));
