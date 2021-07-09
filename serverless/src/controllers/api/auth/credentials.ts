import {MessageConstants} from '../../../constants/message-constants';
import {Response} from '../../../interfaces/response';
import AuthTable from '../../../utilities/auth-processor-utilities';
import BcryptUtilities from '../../../utilities/bcrypt-utilities';
import JwtUtilities from '../../../utilities/jwt-utilities';
import PayloadValidator from '../../../utilities/payload-validator-utilities';
import RequestMapperUtilities from '../../../utilities/request-mapper-utilities';
import MessageUtil from '../../../utilities/response-message-utilities';

/**
 * Contains method for Updating a User's Credentials and Password
 */
export default class Credentials {
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
