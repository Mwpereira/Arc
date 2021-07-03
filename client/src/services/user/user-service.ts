import axios, {AxiosResponse} from 'axios';
import {errorProcessor} from '../../utilities/response-utilities';

axios.defaults.withCredentials = true;

/**
 * User Service Class
 */
export default class UserService {

    private static readonly url: any =
        process.env.VUE_APP_MODE === 'PRODUCTION'
            ? `https://${process.env.VUE_APP_API}`
            : `http://${process.env.VUE_APP_API_LOCAL}`;

    public static async getAccounts(): Promise<AxiosResponse> {
        return await axios
            .get(`${this.url}/user/accounts`)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return errorProcessor(error.response);
            });
    }

    public static async addAccount(account: object): Promise<AxiosResponse> {
        return await axios
            .post(`${this.url}/user/accounts/add`, JSON.stringify(account))
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return errorProcessor(error.response);
            });
    }

    public static async deleteAccount(account: object): Promise<AxiosResponse> {
        return await axios
            .post(`${this.url}/user/accounts/delete`, JSON.stringify(account))
            .then((response: AxiosResponse) => {
                return response;
            })
            .catch((error) => {
                return errorProcessor(error.response);
            });
    }

    public static async updateAccount(account: object): Promise<AxiosResponse> {
        return await axios
            .post(`${this.url}/user/accounts/update`, JSON.stringify(account))
            .then((response: AxiosResponse) => {
                return response;
            })
            .catch((error) => {
                return errorProcessor(error.response);
            });
    }

    public static async updateCredentials(
        credentials: object,
    ): Promise<AxiosResponse> {
        return await axios
            .post(`${this.url}/auth/credentials/update`, JSON.stringify(credentials))
            .then((response: AxiosResponse) => {
                return response;
            })
            .catch((error) => {
                return errorProcessor(error.response);
            });
    }

    public static async updatePassword(passwords: object): Promise<AxiosResponse> {
        return await axios
            .post(`${this.url}/auth/password/update`, JSON.stringify(passwords))
            .then((response: AxiosResponse) => {
                return response;
            })
            .catch((error) => {
                return errorProcessor(error.response);
            });
    }

    public static async deleteUser(user: object): Promise<AxiosResponse> {
        return await axios
            .post(`${this.url}/auth/user/delete`, JSON.stringify(user))
            .then((response: AxiosResponse) => {
                return response;
            })
            .catch((error) => {
                return errorProcessor(error.response);
            });
    }
}
