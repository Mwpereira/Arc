import * as faker from "faker";
import axios, {AxiosResponse} from "axios";

const url =
    process.env.VUE_APP_MODE === 'PRODUCTION'
        ? `https://${process.env.VUE_APP_API}`
        : `http://${process.env.VUE_APP_API_LOCAL}`;
const config = {
    headers: {Cookie: ""},
    withCredentials: false
};

export function getId(response: AxiosResponse): string {
    return response.data.id;
}

export async function loginRequest(user: any): Promise<AxiosResponse> {
    return await axios.post(`${url}/auth/login`, JSON.stringify(user))
        .then((response: AxiosResponse) => {
            return response;
        })
        .catch((error) => {
            return error.response;
        });
}

export async function registerRequest(user: any): Promise<AxiosResponse> {
    return await axios.post(`${url}/auth/register`, JSON.stringify(user))
        .then((response: AxiosResponse) => {
            return response;
        })
        .catch((error) => {
            // Handles 302 response for logging in
            return error.response;
        });
}

export async function getAccounts(signedIn: boolean): Promise<AxiosResponse> {
    return await axios
        .create()
        .get(`${url}/user/accounts`, signedIn ? {} : config)
        .then((response: AxiosResponse) => {
            return response;
        })
        .catch((error) => {
            return error.response;
        });
}

export async function addAccount(account: any, signedIn: boolean): Promise<AxiosResponse> {
    return await axios.post(`${url}/user/accounts/add`, JSON.stringify(account), signedIn ? {} : config)
        .then((response: AxiosResponse) => {
            return response;
        })
        .catch((error) => {
            return error.response;
        });
}

export async function editAccount(account: any, signedIn: boolean): Promise<AxiosResponse> {
    return await axios.post(`${url}/user/accounts/update`, JSON.stringify(account), signedIn ? {} : config)
        .then((response: AxiosResponse) => {
            return response;
        })
        .catch((error) => {
            return error.response;
        });
}

export async function deleteAccount(account: any, signedIn: boolean) {
    return await axios.post(`${url}/user/accounts/delete`, JSON.stringify(account), signedIn ? {} : config)
        .then((response: AxiosResponse) => {
            return response;
        })
        .catch((error) => {
            return error.response;
        });
}

export async function updatePassword(passwords: any, signedIn: boolean): Promise<AxiosResponse> {
    return await axios
        .post(`${url}/auth/password/update`, JSON.stringify(passwords), signedIn ? {} : config)
        .then((response: AxiosResponse) => {
            return response;
        })
        .catch((error) => {
            return error.response;
        });
}

export async function updateCredentials(credentials: any, signedIn: boolean): Promise<AxiosResponse> {
    return await axios
        .post(`${url}/auth/credentials/update`, JSON.stringify(credentials), signedIn ? {} : config)
        .then((response: AxiosResponse) => {
            return response;
        })
        .catch((error) => {
            return error.response;
        });
}

export function generateAccount() {
    return {
        accountName: faker.random.alphaNumeric(32),
        email: faker.internet.email(),
        username: faker.random.alphaNumeric(3),
        password: faker.random.alphaNumeric(7),
        category: "Tech",
        notes: faker.random.alphaNumeric(125),
    };
}

export async function generateUpdatedAccountWithId() {
    let id = getId(await addAccount(generateAccount(), true));
    return {
        id: id,
        accountName: faker.random.alphaNumeric(32),
        email: faker.internet.email(),
        username: faker.random.alphaNumeric(3),
        password: faker.random.alphaNumeric(7),
        category: "Tech",
        notes: faker.random.alphaNumeric(125),
    };
}

