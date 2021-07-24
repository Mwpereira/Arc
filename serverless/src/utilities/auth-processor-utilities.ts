import * as dynamoDB from 'dynamoose';
import * as validator from 'validator';
import {ArcSchema} from '../models/arc';
import RequestMapperUtilities from './request-mapper-utilities';

const arcTable: any = dynamoDB.model('arc', ArcSchema);

/**
 * Provides access to the Auth DynamoDB Table
 */
export default class AuthTable {
    /**
     * Gets if the email already exists in the table
     *
     * @param email
     * @returns boolean if email already exists
     */
    static async getEmailExists(email: string): Promise<boolean> {
        return arcTable
            .scan()
            .where('email')
            .eq(email.toLowerCase())
            .attributes(['id'])
            .exec()
            .then((result: any) => {
                return result.count !== 0;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /**
     * Gets if the user already exists in the table
     *
     * @param user
     * @returns user id
     */
    static getUserExists(user: string): any {
        return arcTable
            .scan()
            .where(validator.isEmail(user) ? 'email' : 'username')
            .eq(user.toLowerCase())
            .attributes(['id'])
            .exec()
            .then((result: any) => {
                if (result.count === 1) {
                    return result[0];
                } else {
                    return undefined;
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /**
     * Gets user's password
     *
     * @param id
     * @returns user password
     */
    static getUserPasswordWithId(id: string): string {
        return arcTable
            .query('id')
            .eq(id)
            .attributes(['password'])
            .exec()
            .then((result: any) => {
                return result[0].password;
            })
            .catch((error) => {
                console.log(error);
                return null;
            });
    }

    /**
     * Gets user's password
     *
     * @param user
     * @returns user password
     */
    static getUserPasswordWithUser(user: string): any {
        return arcTable
            .scan()
            .where(validator.isEmail(user) ? 'email' : 'username')
            .eq(user)
            .attributes(['id', 'password'])
            .exec()
            .then((result: any) => {
                return result[0];
            })
            .catch((error) => {
                console.log(error);
                return null;
            });
    }

    /**
     * Gets User Data
     *
     * @param id
     * @returns user id and key
     */
    static getUserData(id: string): any {
        return arcTable
            .query()
            .where('id')
            .eq(id)
            .attributes(['id', 'username', 'email', 'passwordStrength', 'lastLogin'])
            .exec()
            .then((result: any) => {
                return result[0];
            })
            .catch((error) => {
                console.log(error);
                return null;
            });
    }

    /**
     * Updates User's Email
     *
     * @param id
     * @param email
     * @return update user status
     */
    static updateEmail(id: string, email: string): Promise<boolean> {
        const mappedObject = RequestMapperUtilities.mapUpdateEmailRequest(
            id,
            email
        );
        return arcTable
            .update(
                {
                    id: mappedObject.id,
                },
                {
                    email: mappedObject.email,
                }
            )
            .then(() => {
                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
    }

    /**
     * Updates User's Username
     *
     * @param id
     * @param username
     * @return update user status
     */
    static updateUsername(id: string, username: string): Promise<boolean> {
        const mappedObject = RequestMapperUtilities.mapUpdateUsernameRequest(
            id,
            username
        );
        return arcTable
            .update(
                {
                    id: mappedObject.id,
                },
                {
                    username: mappedObject.username,
                }
            )
            .then(() => {
                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
    }

    /**
     * Updates User's Password
     *
     * @param id
     * @param password
     * @return update user status
     */
    static async updatePassword(id: string, password: string): Promise<string> {
        const mappedObject = await RequestMapperUtilities.mapUpdatePasswordRequest(
            id,
            password
        );

        return arcTable
            .update(
                {
                    id: mappedObject.id,
                },
                {
                    password: mappedObject.password,
                    passwordStrength: mappedObject.passwordStrength
                }
            )
            .then(() => {
                return mappedObject.passwordStrength;
            })
            .catch((error) => {
                console.log(error);
                return null;
            });
    }

    /**
     * Updates User's Last Login
     *
     * @param id
     * @return update auth status
     */
    static updateLastLogin(id: string): Promise<boolean> {
        const mappedObject = RequestMapperUtilities.mapUpdateLastLoginRequest(id);
        return arcTable
            .update(
                {
                    id: mappedObject.id,
                },
                {
                    lastLogin: mappedObject.lastLogin,
                }
            )
            .then(() => {
                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
    }
}
