import {MessageConstants} from '../../constants/message-constants';
import {Response} from '../../interfaces/response';
import ArcTable from '../../utilities/arc-processor-utilities';
import AuthTable from '../../utilities/auth-processor-utilities';
import BcryptUtilities from '../../utilities/bcrypt-utilities';
import JwtUtilities from '../../utilities/jwt-utilities';
import PayloadValidator from '../../utilities/payload-validator-utilities';
import RequestMapperUtilities from '../../utilities/request-mapper-utilities';
import MessageUtil from '../../utilities/response-message-utilities';

export default class Auth {

    /**
     * Contains method for Authorizing a User
     */
    static async login(event: any): Promise<Response> {
        try {
            const user = PayloadValidator.validateLogin(
                RequestMapperUtilities.getUser(event)
            );

            const payload = await RequestMapperUtilities.mapLoginRequest(
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
     * Expire JWT Token
     */
    static async logout(): Promise<Response> {
        try {
            const accessToken = await JwtUtilities.expireJwt();

            return MessageUtil.successAuth(
                200,
                MessageConstants.VALID_TOKEN,
                accessToken,
                false
            );
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
            const user = PayloadValidator.validateRegister(
                RequestMapperUtilities.getUser(event)
            );

            if (!(await AuthTable.getEmailExists(user.email))) {
                if (!(await AuthTable.getUserExists(user.username))) {
                    const payload = await RequestMapperUtilities.mapRegisterRequest(
                        user
                    );

                    if (await ArcTable.createUser(payload)) {
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
    static async deleteUser(event: any): Promise<Response> {
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

    /**
     * Contains logic for updating Email and Username
     */
    static async updateAuth(event: any): Promise<Response> {
        try {
            const payload = JSON.parse(event.body);

            const newEmail = payload.email;
            const newUsername = payload.username;

            const id = RequestMapperUtilities.getId(event);
            const token = JwtUtilities.getToken(
                RequestMapperUtilities.getToken(event)
            );

            const data = JwtUtilities.getDecodedToken(token);
            const currentEmail = data.email;
            const currentUsername = data.username;

            try {
                if (newEmail) {
                    if (currentEmail !== PayloadValidator.validateEmail(newEmail)) {
                        await this.updateEmail(id, newEmail);
                    }
                }
            } catch (error) {
                console.log(error)
                return MessageUtil.error(409, MessageConstants.EMAIL_UPDATE_FAILED);
            }

            try {
                if (newUsername) {
                    if (
                        currentUsername !== PayloadValidator.validateUsername(newUsername)
                    ) {
                        await this.updateUsername(id, newUsername);
                    }
                }
            } catch (error) {
                console.log(error)
                return MessageUtil.error(409, MessageConstants.USERNAME_UPDATE_FAILED);
            }
            payload.id = id;
            return MessageUtil.successAuth(
                200,
                MessageConstants.CREDENTIALS_UPDATE_SUCCESS,
                JwtUtilities.generateJwt(payload),
                true,
                payload
            );
        } catch (error) {
            console.log(error)
            return MessageUtil.error(400, MessageConstants.INVALID_REQUEST);
        }
    }

    /**
     * Updates Email
     */
    static async updateEmail(id: string, email: string): Promise<Response> {
        if (
            !(await AuthTable.getEmailExists(PayloadValidator.validateEmail(email)))
        ) {
            await AuthTable.updateEmail(id, email);
            return MessageUtil.error(200, MessageConstants.EMAIL_UPDATE_SUCCESS);
        } else {
            return MessageUtil.error(409, MessageConstants.EMAIL_TAKEN);
        }
    }


    /**
     * Updates Username
     */
    static async updateUsername(id: string, username: string): Promise<Response> {
        if (
            !(await AuthTable.getUserExists(
                PayloadValidator.validateUsername(username)
            ))
        ) {
            await AuthTable.updateUsername(id, username);
            return MessageUtil.error(200, MessageConstants.USERNAME_UPDATE_SUCCESS);
        } else {
            return MessageUtil.error(409, MessageConstants.USERNAME_TAKEN);
        }
    }


    /**
     * Updates Password
     */
    static async updatePassword(event: any): Promise<Response> {
        try {
            const id = RequestMapperUtilities.getId(event);
            const password = await AuthTable.getUserPasswordWithId(id);
            const passwords = PayloadValidator.validateUpdatePassword(
                JSON.parse(event.body)
            );

            if (
                await BcryptUtilities.validatePassword(
                    passwords.currentPassword,
                    password
                )
            ) {
                if (passwords.currentPassword === passwords.newPassword) {
                    return MessageUtil.error(
                        400,
                        MessageConstants.PASSWORD_UPDATE_SAME_PASSWORD
                    );
                }

                const passwordStrength = await AuthTable.updatePassword(id, passwords.newPassword);

                if (passwordStrength) {
                    return MessageUtil.success(
                        200,
                        MessageConstants.PASSWORD_UPDATE_SUCCESS,
                        {passwordStrength}
                    );
                } else {
                    return MessageUtil.error(
                        404,
                        MessageConstants.PASSWORD_UPDATE_FAILED
                    );
                }
            }
            return MessageUtil.error(401, MessageConstants.PASSWORD_UPDATE_UNAUTH);
        } catch (error) {
            console.log(error)
            return MessageUtil.error(400, MessageConstants.INVALID_REQUEST);
        }
    }
}
