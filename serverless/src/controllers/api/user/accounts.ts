import _ from 'lodash';
import {MessageConstants} from '../../../constants/message-constants';
import {Response} from '../../../interfaces/response';
import AccountsTable from '../../../utilities/accounts-processor-utilities';
import PayloadValidator from '../../../utilities/payload-validator-utilities';
import RequestMapperUtilities from '../../../utilities/request-mapper-utilities';
import MessageUtil from '../../../utilities/response-message-utilities';

/**
 * Contains method for receiving User's Accounts
 */
export default class Accounts {
    static async getAccounts(event: any): Promise<Response> {
        try {
            const id = RequestMapperUtilities.getId(event);
            const accounts = await AccountsTable.getAccounts(id);

            if (accounts !== undefined) {
                return MessageUtil.success(
                    200,
                    MessageConstants.ACCOUNT_GET_SUCCESS,
                    accounts
                );
            }
            return MessageUtil.error(404, MessageConstants.ACCOUNT_GET_FAILED);
        } catch (error) {
            console.log(error);
            return MessageUtil.error(400, MessageConstants.INVALID_REQUEST);
        }
    }

    static async addAccount(event: any) {
        try {
            const id = RequestMapperUtilities.getId(event);
            const account = PayloadValidator.validateAccount(JSON.parse(event.body));
            const accounts = await AccountsTable.getAccounts(id);
            const accountId = await AccountsTable.addAccount(
                id,
                accounts.accounts,
                account
            );

            if (accountId !== null) {
                return MessageUtil.success(200, MessageConstants.ACCOUNT_ADD_SUCCESS, {
                    id: accountId,
                });
            }
            return MessageUtil.error(400, MessageConstants.ACCOUNT_ADD_FAILED);
        } catch (error) {
            console.log(error);
            return MessageUtil.error(400, MessageConstants.INVALID_REQUEST);
        }
    }

    static async deleteAccount(event: any) {
        try {
            const id = RequestMapperUtilities.getId(event);
            const account = PayloadValidator.validateUpdateAccount(JSON.parse(event.body));
            const accounts = (await AccountsTable.getAccounts(id)).accounts;

            if (_.isEqual(accounts[account.id], account)) {
                delete accounts[account.id];
            }

            if (await AccountsTable.updateAccount(id, accounts)) {
                return MessageUtil.success(
                    200,
                    MessageConstants.ACCOUNT_DELETE_SUCCESS,
                    {index: account.id}
                );
            }
            return MessageUtil.error(400, MessageConstants.ACCOUNT_DELETE_FAILED);
        } catch (error) {
            console.log(error);
            return MessageUtil.error(400, MessageConstants.INVALID_REQUEST);
        }
    }

    static async updateAccount(event: any) {
        try {
            const id = RequestMapperUtilities.getId(event);
            const account = PayloadValidator.validateUpdateAccount(JSON.parse(event.body));
            const accounts = (await AccountsTable.getAccounts(id)).accounts;

            accounts[account.id] = account;

            if (await AccountsTable.updateAccount(id, accounts)) {
                return MessageUtil.success(
                    200,
                    MessageConstants.ACCOUNT_UPDATE_SUCCESS,
                    {index: account.id}
                );
            }
            return MessageUtil.error(400, MessageConstants.ACCOUNT_UPDATE_FAILED);
        } catch (error) {
            console.log(error);
            return MessageUtil.error(400, MessageConstants.INVALID_REQUEST);
        }
    }
}
