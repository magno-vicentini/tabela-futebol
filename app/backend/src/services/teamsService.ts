import ITeams from '../interfaces/ITeams';
import TeamsModel from '../database/models/TeamsModel';

export default class TeamsService {
  private model = TeamsModel;

  public async allTeams(): Promise<ITeams[]> {
    const teams = await this.model.findAll();

    console.log(teams);

    return teams;
  }

  public async findById(id: string): Promise<ITeams | null> {
    const teamById = await this.model.findByPk(id);

    if (!teamById) {
      return null;
    }
    return teamById;
  }
}
