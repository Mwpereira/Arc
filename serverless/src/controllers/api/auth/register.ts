import { CreateUserRequest } from '../../../interfaces/create-user-request';
import AuthTable from '../../../utilities/auth-processor-utilities';
import RequestMapperUtilities from '../../../utilities/request-mapper-utilities';
import MessageUtil from '../../../utilities/response-message-utilities';
import { RegisterRequest } from '../../../interfaces/register-request';
import { Response } from '../../../interfaces/response';
import PayloadValidator from '../../../utilities/payload-validator-utilities';
import { MessageConstants } from '../../../constants/message-constants';
import ArcTable from '../../../utilities/arc-processor-utilities';

/**
 * Contains method for Creating a User
 */
export default class Register {
  static async create(event: any): Promise<Response> {
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
}
