import AuthTable from '../../../utilities/auth-processor-utilities';
import PayloadValidator from '../../../utilities/payload-validator-utilities';
import MessageUtil from '../../../utilities/response-message-utilities';
import {MessageConstants} from '../../../constants/message-constants';
import {Response} from '../../../interfaces/response';
import ArcTable from '../../../utilities/arc-processor-utilities';
import RequestMapperUtilities from '../../../utilities/request-mapper-utilities';

/**
 * Contains method for Deleting a User
 */
export default class Delete {
    static async remove(event: any): Promise<Response> {
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
