import MessageUtil from '../../../utilities/response-message-utilities';
import JwtUtilities from '../../../utilities/jwt-utilities';
import { Response } from '../../../interfaces/response';
import { MessageConstants } from '../../../constants/message-constants';
import CookieUtilities from '../../../utilities/cookie-utilities';

/**
 * Refresh JWT Token
 */
export default class RefreshToken {
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
}
