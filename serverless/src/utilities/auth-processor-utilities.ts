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
     * @param _email
     * @returns boolean if email already exists
     */
    static async getEmailExists(_email: string): Promise<boolean> {
        return arcTable
            .scan()
            .where('email')
            .eq(_email.toLowerCase())
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
     * @param _user
     * @returns user id
     */
    static getUserExists(_user: string): any {
        return arcTable
            .scan()
            .where(validator.isEmail(_user) ? 'email' : 'username')
            .eq(_user.toLowerCase())
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
     * @param _id
     * @returns user password
     */
    static getUserPasswordWithId(_id: string): string {
        return arcTable
            .query('id')
            .eq(_id)
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
     * @param _user
     * @returns user password
     */
    static getUserPasswordWithUser(_user: string): any {
        return arcTable
            .scan()
            .where(validator.isEmail(_user) ? 'email' : 'username')
            .eq(_user)
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
     * @param _id
     * @returns user id and key
     */
    static getUserData(_id: string): any {
        return arcTable
            .query()
            .where('id')
            .eq(_id)
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
     * @param _id
     * @param _email
     * @return update user status
     */
    static updateEmail(_id: string, _email: string): Promise<boolean> {
        const mappedObject = RequestMapperUtilities.mapUpdateEmailRequest(
            _id,
            _email
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
     * @param _id
     * @param _username
     * @return update user status
     */
    static updateUsername(_id: string, _username: string): Promise<boolean> {
        const mappedObject = RequestMapperUtilities.mapUpdateUsernameRequest(
            _id,
            _username
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
     * @param _id
     * @param _password
     * @return update user status
     */
    static async updatePassword(_id: string, _password: string): Promise<string> {
        const mappedObject = await RequestMapperUtilities.mapUpdatePasswordRequest(
            _id,
            _password
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
     * @param _id
     * @return update auth status
     */
    static updateLastLogin(_id: string): Promise<boolean> {
        const mappedObject = RequestMapperUtilities.mapUpdateLastLoginRequest(_id);
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
