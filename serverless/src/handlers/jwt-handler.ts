import { Handler } from 'aws-lambda';
import RefreshToken from '../controllers/api/jwt/refresh-token';
import VerifyToken from '../controllers/api/jwt/verify-token';
import Logout from '../controllers/api/jwt/logout';

export const verifyToken: Handler = async (event) => {
  return await VerifyToken.verify(event);
};

export const refresh: Handler = async (event) => {
  return await RefreshToken.refresh(event);
};

export const logout: Handler = async () => {
  return await Logout.removeToken();
};
