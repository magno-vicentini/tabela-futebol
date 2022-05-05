import { Request, Response } from 'express';
import { LeaderboardService } from '../services';

export default class LeaderboardController {
  private leaderboardService: LeaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  public async tableHomeTeams(req: Request, res: Response) {
    const homeTeams = await this.leaderboardService.classificationHome();

    res.status(200).json(homeTeams);
  }

  public async tableAwayTeams(req: Request, res: Response) {
    const awayTeams = await this.leaderboardService.classificationAway();

    res.status(200).json(awayTeams);
  }
}
