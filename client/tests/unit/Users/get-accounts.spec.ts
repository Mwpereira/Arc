import axios, {AxiosResponse} from 'axios';
import {MessageConstants} from '../../utilities/message-constants';
import AuthUtilities from '../utilities/auth-utilities';
import {getAccounts} from '../utilities/common-utilities';

axios.defaults.withCredentials = true;

let response: AxiosResponse;

describe('Get Accounts', () => {
    test('get accounts successfully', async () => {
        response = await new AuthUtilities().login(true);
        response = await getAccounts(true);
        expect(response.status).equal(200);
        expect(response.data.message).equal(MessageConstants.ACCOUNT_GET_SUCCESS);
    });

    test('get accounts without accessToken', async () => {
        response = await getAccounts(false);
        expect(response.status).equal(403);
        expect(response.data.message).equal(MessageConstants.NO_PRINCIPAL_ID);
    });
});
