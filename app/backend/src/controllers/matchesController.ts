import { Request, Response } from 'express';
import { MatchesService, TeamsService } from '../services';

export default class MatchesController {
  private matchesService: MatchesService;

  private teamsService: TeamsService;

  constructor() {
    this.matchesService = new MatchesService();
    this.teamsService = new TeamsService();
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

  public async createMatch(req: Request, res: Response) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;

    const findHomeTeam = await this.teamsService.findById(homeTeam);

    if (!findHomeTeam) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    const findAwayTeam = await this.teamsService.findById(awayTeam);

    if (!findAwayTeam) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    const create = await this.matchesService.createMatch(
      { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress },
    );

    res.status(201).json(create);
  }

  public async updateProgress(req: Request, res: Response) {
    const { id } = req.params;

    await this.matchesService.updateProgress(id);

    const matchById = await this.matchesService.findById(id);

    res.status(200).json(matchById);
  }
}
