import {AxiosResponse} from 'axios';
import * as faker from 'faker';
import {MessageConstants} from '../../utilities/message-constants';
import AuthUtilities from '../Utilities/auth-utilities';
import {updateCredentials, updatePassword} from '../Utilities/common-utilities';

let response: AxiosResponse;
let auth: AuthUtilities;
let user;

describe('Update User Credentials', () => {
    beforeEach(async () => {
        auth = new AuthUtilities();
        user = await auth.register();
        response = await auth.login(false);
    });

    afterEach(async () => {
        await auth.deleteUser(true);
    });

    test('successfully update user credentials', async () => {
        response = await updateCredentials({
            email: faker.internet.email(),
            username: faker.random.alphaNumeric(3),
        }, true);
        expect(response.status).equal(200);
        expect(response.data.message).equal(MessageConstants.CREDENTIALS_UPDATE_SUCCESS);
    });

    test('successfully update user email', async () => {
        response = await updateCredentials({
            email: faker.internet.email(),
            username: user.username,
        }, true);
        expect(response.status).equal(200);
        expect(response.data.message).equal(MessageConstants.CREDENTIALS_UPDATE_SUCCESS);
    });

    test('successfully update user username', async () => {
        response = await updateCredentials({
            email: user.email,
            username: faker.random.alphaNumeric(3),
        }, true);
        expect(response.status).equal(200);
        expect(response.data.message).equal(MessageConstants.CREDENTIALS_UPDATE_SUCCESS);
    });

    test('invalid email', async () => {
        response = await updateCredentials({
            email: faker.random.alphaNumeric(3),
            username: user.username,
        }, true);
        expect(response.status).equal(409);
        expect(response.data.message).equal(MessageConstants.EMAIL_UPDATE_FAILED);
    });

    test('invalid username', async () => {
        response = await updateCredentials({
            email: user.email,
            username: faker.random.alphaNumeric(2),
        }, true);
        expect(response.status).equal(409);
        expect(response.data.message).equal(MessageConstants.USERNAME_UPDATE_FAILED);
    });

    test('update user credentials without accessToken', async () => {
        response = await updatePassword({
            currentPassword: user.password,
            newPassword: faker.random.alphaNumeric(7),
        }, false);
        expect(response.status).equal(403);
        expect(response.data.message).equal(MessageConstants.NO_PRINCIPAL_ID);
    });
});
