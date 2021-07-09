import axios, {AxiosResponse} from 'axios';
import * as faker from 'faker';
import {MessageConstants} from '../../utilities/message-constants';
import AuthUtilities from '../Utilities/auth-utilities';
import {deleteAccount, generateUpdatedAccountWithId} from '../Utilities/common-utilities';

axios.defaults.withCredentials = true;

let response: AxiosResponse;
let account;

describe('Delete Account', () => {
    beforeEach(async () => {
        response = await new AuthUtilities().login(true);
    });

    test('delete account successfully', async () => {
        account = await generateUpdatedAccountWithId();
        response = await deleteAccount(account, true);
        expect(response.status).equal(200);
        expect(response.data.message).equal(MessageConstants.ACCOUNT_DELETE_SUCCESS);
    });

    test('delete account without id', async () => {
        account = await generateUpdatedAccountWithId();
        delete account.id;
        response = await deleteAccount(account, true);
        expect(response.status).equal(400);
        expect(response.data.message).equal(MessageConstants.INVALID_REQUEST);
    });

    test('delete account without account name', async () => {
        account = await generateUpdatedAccountWithId();
        delete account.accountName;
        response = await deleteAccount(account, true);
        expect(response.status).equal(400);
        expect(response.data.message).equal(MessageConstants.INVALID_REQUEST);
    });

    test('delete account with account name exceeding character limit', async () => {
        account = await generateUpdatedAccountWithId();
        account.accountName = faker.random.alphaNumeric(64);
        response = await deleteAccount(account, true);
        expect(response.status).equal(400);
        expect(response.data.message).equal(MessageConstants.INVALID_REQUEST);
    });

    test('delete account without category', async () => {
        account = await generateUpdatedAccountWithId();
        account.category = faker.random.alphaNumeric(5);
        response = await deleteAccount(account, true);
        expect(response.status).equal(400);
        expect(response.data.message).equal(MessageConstants.INVALID_REQUEST);
    });

    test('delete account with category that doesn\'t exist', async () => {
        account = await generateUpdatedAccountWithId();
        delete account.accountName;
        response = await deleteAccount(account, true);
        expect(response.status).equal(400);
        expect(response.data.message).equal(MessageConstants.INVALID_REQUEST);
    });

    test('delete account with notes exceeding character limit', async () => {
        account = await generateUpdatedAccountWithId();
        account.notes = faker.random.alphaNumeric(300);
        response = await deleteAccount(account, true);
        expect(response.status).equal(400);
        expect(response.data.message).equal(MessageConstants.INVALID_REQUEST);
    });

    test('delete account missing fields', async () => {
        account = await generateUpdatedAccountWithId();
        delete account.email;
        response = await deleteAccount(account, true);
        expect(response.status).equal(400);
        expect(response.data.message).equal(MessageConstants.INVALID_REQUEST);

        account = await generateUpdatedAccountWithId();
        delete account.username;
        response = await deleteAccount(account, true);
        expect(response.status).equal(400);
        expect(response.data.message).equal(MessageConstants.INVALID_REQUEST);

        account = await generateUpdatedAccountWithId();
        delete account.password;
        response = await deleteAccount(account, true);
        expect(response.status).equal(400);
        expect(response.data.message).equal(MessageConstants.INVALID_REQUEST);

        account = await generateUpdatedAccountWithId();
        delete account.notes;
        response = await deleteAccount(account, true);
        expect(response.status).equal(400);
        expect(response.data.message).equal(MessageConstants.INVALID_REQUEST);
    });

    test('delete account without accessToken', async () => {
        account = await generateUpdatedAccountWithId();
        response = await deleteAccount(account, false);
        expect(response.status).equal(403);
        expect(response.data.message).equal(MessageConstants.NO_PRINCIPAL_ID);
    });
});
