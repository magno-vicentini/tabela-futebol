import { Request, Response } from 'express';
import { TeamsService } from '../services';

export default class TeamsController {
  private teamsService: TeamsService;

  constructor() {
    this.teamsService = new TeamsService();
  }

  public async allTeams(req_: Request, res: Response) {
    const teams = await this.teamsService.allTeams();

    res.status(200).json(teams);
  }

  public async teamById(req: Request, res: Response) {
    const { id } = req.params;

    const teamById = await this.teamsService.findById(id);

    res.status(200).json(teamById);
  }
}
