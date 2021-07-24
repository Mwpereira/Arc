import {Handler} from 'aws-lambda';
import Jwt from '../controllers/api/jwt';

export const verifyToken: Handler = async (event) => {
    return await Jwt.verify(event);
};

export const refresh: Handler = async (event) => {
    return await Jwt.refresh(event);
};
