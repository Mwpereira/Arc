import axios, {AxiosResponse} from 'axios';
import {MessageConstants} from '../../utilities/message-constants';
import AuthUtilities from '../utilities/auth-utilities';
import * as faker from 'faker';
import {editAccount, generateUpdatedAccountWithId} from '../utilities/common-utilities';

axios.defaults.withCredentials = true;

let response: AxiosResponse;
let account;

describe('Edit Account', () => {
    beforeEach(async () => {
        response = await new AuthUtilities().login(true);
    });

    test('edit account successfully', async () => {
        account = await generateUpdatedAccountWithId();
        response = await editAccount(account, true);
        expect(response.status).toEqual(200);
        expect(response.data.message).toEqual(MessageConstants.ACCOUNT_UPDATE_SUCCESS);
    });

    test('edit account without id', async () => {
        account = await generateUpdatedAccountWithId();
        delete account.id;
        response = await editAccount(account, true);
        expect(response.status).toEqual(400);
        expect(response.data.message).toEqual(MessageConstants.INVALID_REQUEST);
    });

    test('edit account without account name', async () => {
        account = await generateUpdatedAccountWithId();
        delete account.accountName;
        response = await editAccount(account, true);
        expect(response.status).toEqual(400);
        expect(response.data.message).toEqual(MessageConstants.INVALID_REQUEST);
    });

    test('edit account with account name exceeding character limit', async () => {
        account = await generateUpdatedAccountWithId();
        account.accountName = faker.random.alphaNumeric(64);
        response = await editAccount(account, true);
        expect(response.status).toEqual(400);
        expect(response.data.message).toEqual(MessageConstants.INVALID_REQUEST);
    });

    test('edit account without category', async () => {
        account = await generateUpdatedAccountWithId();
        account.category = faker.random.alphaNumeric(5);
        response = await editAccount(account, true);
        expect(response.status).toEqual(400);
        expect(response.data.message).toEqual(MessageConstants.INVALID_REQUEST);
    });

    test('edit account with category that doesn\'t exist', async () => {
        account = await generateUpdatedAccountWithId();
        delete account.accountName;
        response = await editAccount(account, true);
        expect(response.status).toEqual(400);
        expect(response.data.message).toEqual(MessageConstants.INVALID_REQUEST);
    });

    test('edit account with notes exceeding character limit', async () => {
        account = await generateUpdatedAccountWithId();
        account.notes = faker.random.alphaNumeric(300);
        response = await editAccount(account, true);
        expect(response.status).toEqual(400);
        expect(response.data.message).toEqual(MessageConstants.INVALID_REQUEST);
    });

    test('edit account missing fields', async () => {
        account = await generateUpdatedAccountWithId();
        delete account.email;
        response = await editAccount(account, true);
        expect(response.status).toEqual(400);
        expect(response.data.message).toEqual(MessageConstants.INVALID_REQUEST);

        account = await generateUpdatedAccountWithId();
        delete account.username;
        response = await editAccount(account, true);
        expect(response.status).toEqual(400);
        expect(response.data.message).toEqual(MessageConstants.INVALID_REQUEST);

        account = await generateUpdatedAccountWithId();
        delete account.password;
        response = await editAccount(account, true);
        expect(response.status).toEqual(400);
        expect(response.data.message).toEqual(MessageConstants.INVALID_REQUEST);

        account = await generateUpdatedAccountWithId();
        delete account.notes;
        response = await editAccount(account, true);
        expect(response.status).toEqual(400);
        expect(response.data.message).toEqual(MessageConstants.INVALID_REQUEST);
    });

    test('edit account without accessToken', async () => {
        account = await generateUpdatedAccountWithId();
        response = await editAccount(account, false);
        expect(response.status).toEqual(403);
        expect(response.data.message).toEqual(MessageConstants.NO_PRINCIPAL_ID);
    });
});
