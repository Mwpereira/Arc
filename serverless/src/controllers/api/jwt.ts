import {MessageConstants} from '../../constants/message-constants';
import {Response} from '../../interfaces/response';
import CookieUtilities from '../../utilities/cookie-utilities';
import JwtUtilities from '../../utilities/jwt-utilities';
import MessageUtil from '../../utilities/response-message-utilities';


export default class Jwt {
    /**
     * Refresh JWT Token
     */
    static async refresh(event: any): Promise<Response> {
        try {
            const user = JwtUtilities.getDecodedToken(
                JwtUtilities.getToken(CookieUtilities.getCookie(event.headers))
            );
            const accessToken = JwtUtilities.refreshJwt(user);

            return MessageUtil.successAuth(
                200,
                MessageConstants.VALID_TOKEN,
                accessToken,
                true
            );
        } catch (error) {
            console.log(error);
            return MessageUtil.error(400, MessageConstants.INVALID_REQUEST);
        }
    }

    /**
     * Verify JWT Token
     */
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
                console.log('Deny:' + decoded);
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
