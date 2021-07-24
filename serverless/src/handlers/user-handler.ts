import {Handler} from 'aws-lambda';
import User from '../controllers/api/user';

export const getAccounts: Handler = async (event) => {
    return User.getAccounts(event);
};

export const addAccount: Handler = async (event) => {
    return User.addAccount(event);
};

export const deleteAccount: Handler = async (event) => {
    return await User.deleteAccount(event);
};

export const updateAccount: Handler = async (event) => {
    return await User.updateAccount(event);
};
