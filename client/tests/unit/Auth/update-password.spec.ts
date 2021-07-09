import {AxiosResponse} from 'axios';
import * as faker from 'faker';
import {MessageConstants} from '../../utilities/message-constants';
import AuthUtilities from '../Utilities/auth-utilities';
import {updatePassword} from '../Utilities/common-utilities';

let response: AxiosResponse;
let auth: AuthUtilities;
let user: any;

describe('Update User Password', () => {
    beforeEach(async () => {
        auth = new AuthUtilities();
        user = await auth.register();
        response = await auth.login(false);
    });

    afterEach(async () => {
        await auth.deleteUser(true);
    });

    test('successfully update user password', async () => {
        response = await updatePassword({
            currentPassword: user.password,
            newPassword: faker.random.alphaNumeric(7),
        }, true);
        expect(response.status).equal(200);
        expect(response.data.message).equal(MessageConstants.PASSWORD_UPDATE_SUCCESS);
    });

    test('invalid old password', async () => {
        response = await updatePassword({
            currentPassword: faker.random.alphaNumeric(7),
            newPassword: faker.random.alphaNumeric(7),
        }, true);
        expect(response.status).equal(401);
        expect(response.data.message).equal(MessageConstants.PASSWORD_UPDATE_UNAUTH);
    });

    test('invalid new password', async () => {
        response = await updatePassword({
            currentPassword: user.password,
            newPassword: faker.random.alphaNumeric(3),
        }, true);
        expect(response.status).equal(400);
        expect(response.data.message).equal(MessageConstants.INVALID_REQUEST);
    });

    test('invalid new password is the same as old password', async () => {
        response = await updatePassword({
            currentPassword: user.password,
            newPassword: user.password,
        }, true);
        expect(response.status).equal(400);
        expect(response.data.message).equal(MessageConstants.PASSWORD_UPDATE_SAME_PASSWORD);
    });

    test('invalid new password, missing newPassword field', async () => {
        response = await updatePassword({
            currentPassword: user.password,
        }, true);
        expect(response.status).equal(400);
        expect(response.data.message).equal(MessageConstants.INVALID_REQUEST);
    });

    test('invalid new password, missing currentPassword field', async () => {
        response = await updatePassword({
            newPassword: user.password,
        }, true);
        expect(response.status).equal(400);
        expect(response.data.message).equal(MessageConstants.INVALID_REQUEST);
    });

    test('update user password without accessToken', async () => {
        response = await updatePassword({
            currentPassword: user.password,
            newPassword: faker.random.alphaNumeric(7),
        }, false);
        expect(response.status).equal(403);
        expect(response.data.message).equal(MessageConstants.NO_PRINCIPAL_ID);
    });
});
