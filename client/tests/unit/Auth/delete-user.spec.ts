import {AxiosResponse} from 'axios';
import {MessageConstants} from '../../utilities/message-constants';
import AuthUtilities from '../utilities/auth-utilities';

let response: AxiosResponse;
let auth: AuthUtilities;
let user;

describe('Delete User', () => {
    beforeEach(async () => {
        auth = new AuthUtilities();
        user = await auth.register();
        response = await auth.login(false);
    });

    afterEach(async () => {
        await auth.deleteUser(true);
    });

    test('successfully delete user', async () => {
        response = await auth.deleteUser(true);
        expect(response.status).equal(200);
        expect(response.data.message).equal(MessageConstants.USER_DELETE_SUCCESS);
    });

    test('invalid user object with missing email', async () => {
        const deleteThisUser = {...user};
        delete deleteThisUser.password;
        delete deleteThisUser.email;

        response = await auth.deleteUser(true, deleteThisUser);
        expect(response.status).equal(400);
        expect(response.data.message).equal(MessageConstants.INVALID_REQUEST);
    });

    test('invalid user object with missing username', async () => {
        const deleteThisUser = {...user};
        delete deleteThisUser.password;
        delete deleteThisUser.username;

        response = await auth.deleteUser(true, deleteThisUser);
        expect(response.status).equal(400);
        expect(response.data.message).equal(MessageConstants.INVALID_REQUEST);
    });

    test('delete user without accessToken', async () => {
        response = await auth.deleteUser(false);
        expect(response.status).equal(403);
        expect(response.data.message).equal(MessageConstants.NO_PRINCIPAL_ID);
    });
});
