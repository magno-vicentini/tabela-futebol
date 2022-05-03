import { Request, Response } from 'express';
import { MatchesService } from '../services';

export default class MatchesController {
  private matchesService: MatchesService;

  constructor() {
    this.matchesService = new MatchesService();
  }

  public async allMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress) {
      const matchesInProgress = await this
        .matchesService.matchesInProgress(inProgress.toString());
      return res.status(200).json(matchesInProgress);
    }

    const matches = await this.matchesService.allMatches();

    res.status(200).json(matches);
  }

  public async createMatche(req: Request, res: Response) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;

    const create = await this.matchesService.createMatche(
      { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress },
    );

    res.status(201).json(create);
  }
}
