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

  public async createMatche(payload: object): Promise<IMatches> {
    const create = await this.model.create({ ...payload });

    return create;
  }
}
