import IMatches from '../interfaces/IMatches';
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';

export default class MatchesService {
  private model = MatchesModel;

  public async allMatches(): Promise<IMatches[]> {
    const matches = await this.model.findAll({ include: [{
      model: TeamsModel,
      as: 'teamHome',
      attributes: ['teamName'],
    },
    {
      model: TeamsModel,
      as: 'teamAway',
      attributes: ['teamName'],
    },
    ],
    });

    console.log(matches);

    return matches;
  }

  public async matchesInProgress(progress: string): Promise<IMatches[]> {
    const matches = await this.model.findAll({
      where: { inProgress: (progress === 'true') },
      include: [{
        model: TeamsModel,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: TeamsModel,
        as: 'teamAway',
        attributes: ['teamName'],
      },
      ],
    });

    return matches;
  }

  public async createMatch(payload: object): Promise<IMatches> {
    const create = await this.model.create({ ...payload });

    return create;
  }

  public async updateProgress(id: string): Promise<boolean> {
    const update = await this.model.update(
      { inProgress: false },
      {
        where: { id },
      },
    );
    if (update) {
      return true;
    }
    return false;
  }

  public async findById(id: string): Promise<IMatches | null> {
    const matchById = await this.model.findByPk(id);

    if (!matchById) {
      return null;
    }
    return matchById;
  }
}
