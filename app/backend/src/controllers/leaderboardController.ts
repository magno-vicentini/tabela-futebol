import { Request, Response } from 'express';
import { LeaderboardService } from '../services';

export default class LeaderboardController {
  private leaderboardService: LeaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  public async tableHomeTeams(req: Request, res: Response) {
    const homeTeams = this.leaderboardService.homeLeaderBoard;

    res.status(200).json(homeTeams);
  }
}
