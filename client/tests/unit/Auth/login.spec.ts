import {AxiosResponse} from 'axios';
import {MessageConstants} from '../../utilities/message-constants';
import * as faker from 'faker';
import {loginRequest} from '../Utilities/common-utilities';

let response: AxiosResponse;
const email = process.env.TEST_EMAIL;
const username = process.env.TEST_USERNAME;
const password = process.env.TEST_PASSWORD;

describe('Login', () => {
    async function validRequest(user: any) {
        response = await loginRequest(user);
        expect(response.status).equal(302);
        expect(response.data.message).equal(MessageConstants.USER_AUTHORIZED);
    }

    async function invalidRequest(user: any) {
        response = await loginRequest(user);
        expect(response.status).equal(404);
        expect(response.data.message).equal(MessageConstants.INVALID_CREDENTIALS);
    }

    async function invalidUserRequest(user: any) {
        response = await loginRequest(user);
        expect(response.status).equal(400);
        expect(response.data.message).equal(MessageConstants.INVALID_REQUEST);
    }

    test('valid credentials - email', async () => {
        await validRequest({user: {username: email, password}});
    });

    test('valid credentials - username', async () => {
        await validRequest({user: {username, password}});
    });

    test('invalid user object', async () => {
        await invalidUserRequest({user: {username: faker.random.alphaNumeric(5)}});
        await invalidUserRequest({user: {password: faker.random.alphaNumeric(5)}});
    });

    test('not existent credentials', async () => {
        await invalidRequest({user: {username: faker.random.alphaNumeric(5), password: faker.random.alphaNumeric(5)}});
    });

    test('invalid password - email', async () => {
        await invalidRequest({user: {username: email, password: faker.random.alphaNumeric(7)}});
    });

    test('invalid password - username', async () => {
        await invalidRequest({user: {username, password: faker.random.alphaNumeric(7)}});
    });
});
