import { Handler } from 'aws-lambda';
import Register from '../controllers/api/auth/register';
import Login from '../controllers/api/auth/login';
import Credentials from '../controllers/api/auth/credentials';
import Delete from '../controllers/api/auth/delete';

export const register: Handler = async (event) => {
  return await Register.create(event);
};

export const login: Handler = async (event) => {
  return await Login.authorize(event);
};

export const updateCredentials: Handler = async (event) => {
  return await Credentials.updateAuth(event);
};

export const updatePassword: Handler = async (event) => {
  return await Credentials.updatePassword(event);
};

export const deleteUser: Handler = async (event) => {
  return await Delete.remove(event);
};
