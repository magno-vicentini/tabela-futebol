import bcrypt = require('bcryptjs');
import UsersModel from '../database/models/UsersModel';

export default class UserService {
  private model = UsersModel;

  public async findUser(email: string, password: string): Promise<UsersModel | boolean> {
    const userLogin = await this.model.findOne({ where: { email } });
    if (userLogin === null) {
      return false;
    }
    if (!bcrypt.compareSync(password, userLogin.password)) {
      console.log(bcrypt.compareSync(password, userLogin.password));
      return false;
    }

    return userLogin;
  }
}
