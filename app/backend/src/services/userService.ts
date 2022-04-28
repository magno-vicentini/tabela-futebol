import bcrypt = require('bcryptjs');
import IUser from '../interfaces/IUser';
import UsersModel from '../database/models/UsersModel';

export default class UserService {
  private model = UsersModel;

  public async findUser(email: string, password: string): Promise<IUser | null> {
    const userLogin = await this.model.findOne({ where: { email } });
    if (!userLogin) {
      return null;
    }
    if (!bcrypt.compareSync(password, userLogin.password)) {
      console.log(bcrypt.compareSync(password, userLogin.password));
      return null;
    }

    return {
      id: userLogin.id,
      username: userLogin.username,
      role: userLogin.role,
      email: userLogin.email,
    };
  }
}
