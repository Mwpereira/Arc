import axios, {AxiosResponse} from 'axios';
import {MessageConstants} from '../../utilities/message-constants';
import AuthUtilities from '../Utilities/auth-utilities';
import * as faker from 'faker';
import {addAccount, generateAccount} from '../Utilities/common-utilities';

axios.defaults.withCredentials = true;

let response: AxiosResponse;
let account;

describe('Add Account', () => {
    beforeAll(async () => {
        response = await new AuthUtilities().login(true);
    });

    test('add account successfully', async () => {
        response = await addAccount(generateAccount(), true);
        expect(response.status).equal(200);
        expect(response.data.message).equal(MessageConstants.ACCOUNT_ADD_SUCCESS);
    });

    test('add account without account name', async () => {
        account = generateAccount();
        delete account.accountName;
        response = await addAccount(account, true);
        expect(response.status).equal(400);
        expect(response.data.message).equal(MessageConstants.INVALID_REQUEST);
    });

    test('add account with account name exceeding character limit', async () => {
        account = generateAccount();
        account.accountName = faker.random.alphaNumeric(64);
        response = await addAccount(account, true);
        expect(response.status).equal(400);
        expect(response.data.message).equal(MessageConstants.INVALID_REQUEST);
    });

    test('add account without category', async () => {
        account = generateAccount();
        delete account.category;
        response = await addAccount(account, true);
        expect(response.status).equal(400);
        expect(response.data.message).equal(MessageConstants.INVALID_REQUEST);
    });

    test('add account with category that doesn\'t exist', async () => {
        account = generateAccount();
        account.category = faker.random.alphaNumeric(5);
        response = await addAccount(account, true);
        expect(response.status).equal(400);
        expect(response.data.message).equal(MessageConstants.INVALID_REQUEST);
    });

    test('add account with notes exceeding character limit', async () => {
        account = generateAccount();
        account.notes = faker.random.alphaNumeric(300);
        response = await addAccount(account, true);
        expect(response.status).equal(400);
        expect(response.data.message).equal(MessageConstants.INVALID_REQUEST);
    });

    test('add account missing fields', async () => {
        account = generateAccount();
        delete account.email;
        response = await addAccount(account, true);
        expect(response.status).equal(400);
        expect(response.data.message).equal(MessageConstants.INVALID_REQUEST);

        account = generateAccount();
        delete account.username;
        response = await addAccount(account, true);
        expect(response.status).equal(400);
        expect(response.data.message).equal(MessageConstants.INVALID_REQUEST);

        account = generateAccount();
        delete account.password;
        response = await addAccount(account, true);
        expect(response.status).equal(400);
        expect(response.data.message).equal(MessageConstants.INVALID_REQUEST);

        account = generateAccount();
        delete account.notes;
        response = await addAccount(account, true);
        expect(response.status).equal(400);
        expect(response.data.message).equal(MessageConstants.INVALID_REQUEST);
    });

    test('add account without accessToken', async () => {
        response = await addAccount(generateAccount(), false);
        expect(response.status).equal(403);
        expect(response.data.message).equal(MessageConstants.NO_PRINCIPAL_ID);
    });
});
