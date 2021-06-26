import AuthTable from '../../../utilities/auth-processor-utilities';
import BcryptUtilities from '../../../utilities/bcrypt-utilities';
import MessageUtil from '../../../utilities/response-message-utilities';
import JwtUtilities from '../../../utilities/jwt-utilities';
import { AuthorizeUserRequest } from '../../../interfaces/authorize-user-request';
import { Response } from '../../../interfaces/response';
import PayloadValidator from '../../../utilities/payload-validator-utilities';
import RequestMapperUtilities from '../../../utilities/request-mapper-utilities';
import { MessageConstants } from '../../../constants/message-constants';
import { LoginRequest } from '../../../interfaces/login-request';
import {CreateUserRequest} from '../../../interfaces/create-user-request';
import {RegisterRequest} from '../../../interfaces/register-request';
import ArcTable from '../../../utilities/arc-processor-utilities';

export default class Auth {

    /**
     * Contains method for Authorizing a User
     */

    static async login(event: any): Promise<Response> {
        try {
            const user: AuthorizeUserRequest = PayloadValidator.validateLogin(
                RequestMapperUtilities.getUser(event)
            );

            const payload: LoginRequest = await RequestMapperUtilities.mapLoginRequest(
                user
            );
            const authData = await AuthTable.getUserPasswordWithUser(
                payload.username
            );

            if (authData) {
                if (
                    await BcryptUtilities.validatePassword(
                        payload.password,
                        authData.password
                    )
                ) {
                    const userData = await AuthTable.getUserData(authData.id);
                    const accessToken = await JwtUtilities.generateJwt(userData);

                    if (await AuthTable.updateLastLogin(authData.id)) {
                        return MessageUtil.successAuth(
                            302,
                            MessageConstants.USER_AUTHORIZED,
                            accessToken,
                            false,
                            userData
                        );
                    } else {
                        return MessageUtil.error(500, MessageConstants.DATABASE_ERROR);
                    }
                } else {
                    return MessageUtil.error(404, MessageConstants.INVALID_CREDENTIALS);
                }
            } else {
                return MessageUtil.error(404, MessageConstants.INVALID_CREDENTIALS);
            }
        } catch (error) {
            console.log(error);
            return MessageUtil.error(400, MessageConstants.INVALID_REQUEST);
        }
    }

    /**
     * Contains method for Creating a User
     */

    static async register(event: any): Promise<Response> {
        try {
            const user: CreateUserRequest = PayloadValidator.validateRegister(
                RequestMapperUtilities.getUser(event)
            );

            if (!(await AuthTable.getEmailExists(user.email))) {
                if (!(await AuthTable.getUserExists(user.username))) {
                    const payload: RegisterRequest = await RequestMapperUtilities.mapRegisterRequest(
                        user
                    );

                    if (await ArcTable.createUser(payload)) {
                        console.log('User Created');
                        return MessageUtil.success(201, MessageConstants.USER_CREATED);
                    } else {
                        return MessageUtil.error(500, MessageConstants.DATABASE_ERROR);
                    }
                } else {
                    return MessageUtil.error(409, MessageConstants.USERNAME_TAKEN);
                }
            } else {
                return MessageUtil.error(409, MessageConstants.EMAIL_TAKEN);
            }
        } catch (error) {
            console.log(error);
            return MessageUtil.error(400, MessageConstants.INVALID_REQUEST);
        }
    }


    /**
     * Contains method for Deleting a User
     */

    static async delete(event: any): Promise<Response> {
        try {
            const id = RequestMapperUtilities.getId(event);
            const data = PayloadValidator.validateDeleteUser(
                JSON.parse(event.body)
            );
            const user = await AuthTable.getUserData(id);
            if (data.email === user.email && data.username === user.username) {
                if (await ArcTable.deleteUser(id)) {
                    return MessageUtil.success(200, MessageConstants.USER_DELETE_SUCCESS);
                } else {
                    return MessageUtil.error(500, MessageConstants.DATABASE_ERROR);
                }
            } else {
                return MessageUtil.error(500, MessageConstants.INVALID_REQUEST);
            }
        } catch (error) {
            console.log(error);
            return MessageUtil.error(400, MessageConstants.INVALID_REQUEST);
        }
    }
}
