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

/**
 * Contains method for Authorizing a User
 */
export default class Login {
  static async authorize(event: any): Promise<Response> {
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
}
