import UsersModel from '../models/UsersModel';

export default class UserService {
  private model = UsersModel;

  public async findUser(email: string, password: string): Promise<UsersModel | boolean> {
    const user = await this.model.findOne({ where: { email, password } });

    if (user === null) {
      return false;
    }
    return user;
  }
}
