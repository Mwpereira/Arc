import { Handler } from 'aws-lambda';

import Accounts from '../controllers/api/user/accounts';

export const getAccounts: Handler = async (event) => {
  return Accounts.getAccounts(event);
};

export const addAccount: Handler = async (event) => {
  return Accounts.addAccount(event);
};

export const deleteAccount: Handler = async (event) => {
  return await Accounts.deleteAccount(event);
};

export const updateAccount: Handler = async (event) => {
  return await Accounts.updateAccount(event);
};
