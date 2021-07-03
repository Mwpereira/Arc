import MessageUtil from '../../../utilities/response-message-utilities';
import JwtUtilities from '../../../utilities/jwt-utilities';
import {MessageConstants} from '../../../constants/message-constants';
import CookieUtilities from '../../../utilities/cookie-utilities';

/**
 * Verify JWT Token
 */
export default class VerifyToken {
    static async verify(event: any): Promise<any> {
        try {
            const token: string = JwtUtilities.getToken(
                CookieUtilities.getCookie(event.headers)
            );
            const methodArn = event.methodArn;

            if (!token) {
                return MessageUtil.error(404, MessageConstants.TOKEN_NOT_FOUND);
            }

            const decoded: any = JwtUtilities.verify(token);

            if (decoded && decoded.sub) {
                return JwtUtilities.generatePolicyResponse(
                    decoded.sub,
                    'Allow',
                    methodArn
                );
            } else {
                return JwtUtilities.generatePolicyResponse(
                    decoded.sub,
                    'Deny',
                    methodArn
                );
            }
        } catch (error) {
            console.log(error);
            return MessageUtil.error(400, MessageConstants.INVALID_TOKEN);
        }
    }
}
