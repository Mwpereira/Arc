import {Handler} from 'aws-lambda';
import Logout from '../controllers/api/jwt/logout';
import RefreshToken from '../controllers/api/jwt/refresh-token';
import VerifyToken from '../controllers/api/jwt/verify-token';

export const verifyToken: Handler = async (event) => {
    return await VerifyToken.verify(event);
};

export const refresh: Handler = async (event) => {
    return await RefreshToken.refresh(event);
};

export const logout: Handler = async () => {
    return await Logout.removeToken();
};
