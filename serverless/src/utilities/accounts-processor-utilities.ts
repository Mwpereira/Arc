import * as dynamoDB from 'dynamoose';
import {ArcSchema} from '../models/arc';
import RequestMapperUtilities from './request-mapper-utilities';

const arcTable: any = dynamoDB.model('arc', ArcSchema);

/**
 * Provides access to the Accounts DynamoDB Table
 */
export default class AccountsTable {
    /**
     * Gets User's Accounts
     *
     * @param id
     * @returns user accounts
     */
    static async getAccounts(id: string): Promise<any> {
        return arcTable
            .query()
            .where('id')
            .eq(id)
            .attributes(['accounts'])
            .exec()
            .then((result: any) => {
                const accounts = result[0].accounts;
                if (accounts === '') {
                    return {accounts: null};
                } else {
                    return {accounts: JSON.parse(accounts)};
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
     * @param id
     * @param accounts
     * @param account
     * @return add user account status
     */
    static async addAccount(
        id: string,
        accounts: object,
        account: object
    ): Promise<string> {
        const mappedObject = await RequestMapperUtilities.mapAddAccountRequest(
            id,
            account
        );
        if (accounts) {
            accounts[`${mappedObject.id}`] = mappedObject;
        } else {
            accounts = {[mappedObject.id]: mappedObject};
        }
        return arcTable
            .update({
                id,
                accounts: JSON.stringify(accounts),
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
     * @param id
     * @param accounts
     * @return update account status
     */
    static async updateAccount(id: string, accounts: object): Promise<boolean> {
        const mappedObject = await RequestMapperUtilities.mapUpdateAccountRequest(
            id,
            accounts
        );
        return arcTable
            .update({
                id,
                accounts:
                    Object.keys(accounts).length === 0
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
