import * as dynamoDB from 'dynamoose';
import { ArcSchema } from '../models/arc';

const arcTable: any = dynamoDB.model('arc', ArcSchema);

/**
 * Provides access to the Arc DynamoDB Table
 */

export default class ArcTable {
  /**
   * Create User Account
   *
   * @param _user
   * @return status
   */
  static createUser(_user: any): boolean {
    return arcTable
      .create({
        id: _user.id,
        email: _user.email,
        username: _user.username,
        password: _user.password,
        passwordStrength: _user.passwordStrength,
        accounts: _user.accounts,
        lastLogin: _user.lastLogin,
        createdAt: _user.lastLogin,
      })
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  /**
   * Deletes User
   *
   * @param _id
   * @return status
   */
  static deleteUser(_id: string): boolean {
    return arcTable
      .delete({ id: _id })
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }
}
