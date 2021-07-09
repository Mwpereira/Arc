import axios, {AxiosResponse} from 'axios';
import * as faker from 'faker';
import {registerRequest} from './common-utilities';

axios.defaults.withCredentials = true;

const url: any =
    process.env.VUE_APP_MODE === 'PRODUCTION'
        ? `https://${process.env.VUE_APP_API}`
        : `http://${process.env.VUE_APP_API_LOCAL}`;
const config = {
    headers: {Cookie: ''},
    withCredentials: false,
};
const username = process.env.TEST_USERNAME;
const password = process.env.TEST_PASSWORD;

export default class AuthUtilities {
    public accessToken: string;
    public email: string;
    public username: string;
    public password: string;

    constructor() {
    }

    public async register(): Promise<any> {
        const user = {
            email: faker.internet.email().toLowerCase(),
            username: 'arc' + faker.random.alphaNumeric(9).toLowerCase(),
            password: faker.random.alphaNumeric(7),
        };

        await registerRequest({user});

        this.email = user.email;
        this.username = user.username;
        this.password = user.password;

        return user;
    }

    public async login(testAccount: boolean): Promise<AxiosResponse> {
        return await axios.post(`${url}/auth/login`, JSON.stringify(testAccount ? {
            user: {
                username,
                password,
            },
        } : this.getUserLogin()))
            .then((response: AxiosResponse) => {
                return response;
            })
            .catch((error) => {
                return error.response;
            });
    }

    public async deleteUser(signedIn: boolean, user?: any): Promise<AxiosResponse> {
        return await axios
            .post(`${url}/auth/user/delete`, JSON.stringify(user === undefined ? this.getUserDelete() : user), signedIn ? {} : config)
            .then((response: AxiosResponse) => {
                return response;
            })
            .catch((error) => {
                return error.response;
            });
    }

    public getUserLogin() {
        return {
            user: {
                username: this.username,
                password: this.password,
            },
        };
    }

    public getUserDelete() {
        return {
            email: this.email,
            username: this.username,
        };
    }
}
