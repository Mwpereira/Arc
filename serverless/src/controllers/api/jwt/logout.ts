import {MessageConstants} from '../../../constants/message-constants';
import {Response} from '../../../interfaces/response';
import JwtUtilities from '../../../utilities/jwt-utilities';
import MessageUtil from '../../../utilities/response-message-utilities';

/**
 * Expire JWT Token
 */
export default class Logout {
    static async removeToken(): Promise<Response> {
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
}
