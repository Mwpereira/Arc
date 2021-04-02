import RequestMapperUtilities from './request-mapper-utilities';
import * as dynamoDB from 'dynamoose';
import { ArcSchema } from '../models/arc';

const arcTable: any = dynamoDB.model('arc', ArcSchema);

/**
 * Provides access to the Accounts DynamoDB Table
 */
export default class AccountsTable {
  /**
   * Gets User's Accounts
   *
   * @param _id
   * @returns user accounts
   */
  static async getAccounts(_id: string): Promise<any> {
    return arcTable
      .query()
      .where('id')
      .eq(_id)
      .attributes(['accounts'])
      .exec()
      .then((result: any) => {
        const accounts = result[0].accounts;
        if (accounts === '') {
          return { accounts: null };
        } else {
          return { accounts: JSON.parse(accounts) };
        }
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  /**
   * Add User's Account
   *
   * @param _id
   * @param _accounts
   * @param _account
   * @return add user account status
   */
  static async addAccount(
    _id: string,
    _accounts: any,
    _account: any
  ): Promise<string> {
    const mappedObject = await RequestMapperUtilities.mapAddAccountRequest(
      _id,
      _account
    );
    if (_accounts) {
      _accounts[`${mappedObject.id}`] = mappedObject;
    } else {
      // @ts-ignore
      _accounts = { [mappedObject.id]: mappedObject };
    }
    return arcTable
      .update({
        id: _id,
        accounts: JSON.stringify(_accounts),
      })
      .then(() => {
        return mappedObject.id;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  /**
   * Update User's Account
   *
   * @param _id
   * @param _accounts
   * @return update account status
   */
  static async updateAccount(_id: string, _accounts: any): Promise<boolean> {
    const mappedObject = await RequestMapperUtilities.mapUpdateAccountRequest(
      _id,
      _accounts
    );
    return arcTable
      .update({
        id: _id,
        accounts:
          Object.keys(_accounts).length === 0
            ? ''
            : JSON.stringify(mappedObject.accounts),
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
}
