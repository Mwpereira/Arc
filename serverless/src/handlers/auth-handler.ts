import {Handler} from 'aws-lambda';
import Auth from '../controllers/api/auth';

export const register: Handler = async (event) => {
    return await Auth.register(event);
};

export const login: Handler = async (event) => {
    return await Auth.login(event);
};

export const logout: Handler = async () => {
    return await Auth.logout();
};

export const updateCredentials: Handler = async (event) => {
    return await Auth.updateAuth(event);
};

export const updatePassword: Handler = async (event) => {
    return await Auth.updatePassword(event);
};

export const deleteUser: Handler = async (event) => {
    return await Auth.deleteUser(event);
};
