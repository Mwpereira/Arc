import * as dynamoDB from 'dynamoose';
import {ArcSchema} from '../models/arc';

const arcTable: any = dynamoDB.model('arc', ArcSchema);

/**
 * Provides access to the Arc DynamoDB Table
 */
export default class ArcTable {
    /**
     * Create User Account
     *
     * @param user
     * @return status
     */
    static createUser(user: any): boolean {
        return arcTable
            .create({
                id: user.id,
                email: user.email,
                username: user.username,
                password: user.password,
                passwordStrength: user.passwordStrength,
                accounts: user.accounts,
                lastLogin: user.lastLogin,
                createdAt: user.lastLogin,
            })
            .then(() => {
                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
    }

    /**
     * Deletes User
     *
     * @param id
     * @return status
     */
    static deleteUser(id: string): boolean {
        return arcTable
            .delete({id})
            .then(() => {
                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
    }
}
