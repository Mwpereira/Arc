import {Handler} from 'aws-lambda';
import Credentials from '../controllers/api/auth/credentials';
import Auth from '../controllers/api/auth/auth';

export const register: Handler = async (event) => {
    return await Auth.register(event);
};

export const login: Handler = async (event) => {
    return await Auth.login(event);
};

export const updateCredentials: Handler = async (event) => {
    return await Credentials.updateAuth(event);
};

export const updatePassword: Handler = async (event) => {
    return await Credentials.updatePassword(event);
};

export const deleteUser: Handler = async (event) => {
    return await Auth.delete(event);
};
