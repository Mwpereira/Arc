import {APIGatewayEvent} from 'aws-lambda';
import moment from 'moment';
import * as uuid from 'uuid';
import validator from 'validator';
import {Accounts} from '../interfaces/accounts';
import {AddAccountRequest} from '../interfaces/add-account-request';
import {LoginRequest} from '../interfaces/login-request';
import {RegisterRequest} from '../interfaces/register-request';
import {UpdateCredentialsRequest} from '../interfaces/update-credentials-request';
import {UpdateEmailRequest} from '../interfaces/update-email-request';
import {UpdateLastLoginRequest} from '../interfaces/update-last-login-request';
import {UpdatePasswordRequest} from '../interfaces/update-password-request';
import {UpdateUsernameRequest} from '../interfaces/update-username-request';
import BcryptUtilities from './bcrypt-utilities';
import PayloadValidator from './payload-validator-utilities';

export default class RequestMapperUtilities {
    /**
     * Retrieves user from request
     *
     * @param event
     */
    static getUser(event: APIGatewayEvent): object {
        return JSON.parse(event.body).user;
    }

    /**
     * Retrieves user Id from authorizer
     *
     * @param event
     */
    static getId(event): string {
        return PayloadValidator.validateId(
            event.requestContext.authorizer.principalId
        );
    }

    /**
     * Retrieves token from authorizer
     */
    static getToken(event): string {
        if (event.headers.Cookie) {
            return event.headers.Cookie;
        } else {
            return event.headers.cookie;
        }
    }

    /**
     * Maps Register Request
     *
     * @param data
     * @return register request
     */
    static async mapRegisterRequest(data: any): Promise<RegisterRequest> {
        const _password: any = await BcryptUtilities.getHashedValue(data.password);

        return {
            id: uuid.v4(),
            email: data.email.toLowerCase(),
            username: data.username.toLowerCase(),
            password: _password,
            passwordStrength: this.getPasswordStrength(data.password),
            accounts: '',
            lastLogin: moment().format('MMMM Do YYYY, h:mm:ss a'),
        };
    }

    /**
     * Maps Login Request
     *
     * @param data
     * @return login request
     */
    static async mapLoginRequest(data: any): Promise<LoginRequest> {
        return {
            username: data.username.toLowerCase(),
            password: data.password,
        };
    }

    /**
     * Maps Add Account Request
     *
     * @param _id
     * @param _account
     * @return add account request
     */
    static async mapAddAccountRequest(
        _id: string,
        _account: any
    ): Promise<AddAccountRequest> {
        return {
            id: uuid.v4(),
            accountName: _account.accountName,
            email: _account.email,
            username: _account.username,
            password: _account.password,
            category: _account.category,
            notes: _account.notes,
        };
    }

    /**
     * Maps Update Account Request
     *
     * @param _id
     * @param _accounts
     * @return Accounts
     */
    static async mapUpdateAccountRequest(
        _id: string,
        _accounts: any
    ): Promise<Accounts> {
        return {
            id: _id,
            accounts: _accounts,
        };
    }

    /**
     * Maps Update Email Request
     *
     * @param _id
     * @param _email
     * @return update email request
     */
    static mapUpdateEmailRequest(
        _id: string,
        _email: string
    ): UpdateEmailRequest {
        return {
            id: _id,
            email: _email,
        };
    }

    /**
     * Maps Update Username Request
     *
     * @param _id
     * @param _username
     * @return update username request
     */
    static mapUpdateUsernameRequest(
        _id: string,
        _username: string
    ): UpdateUsernameRequest {
        return {
            id: _id,
            username: _username.toLowerCase(),
        };
    }

    /**
     * Maps Update Credentials Request
     *
     * @param _id
     * @param _credentials
     * @return update credentials request
     */
    static mapUpdateCredentialsRequest(
        _id: string,
        _credentials: string
    ): UpdateCredentialsRequest {
        return {
            id: _id,
            credentials: _credentials,
        };
    }

    /**
     * Maps Update Password Request
     *
     * @param _id
     * @param _password
     * @return update password request
     */
    static async mapUpdatePasswordRequest(
        _id: string,
        _password: string
    ): Promise<UpdatePasswordRequest> {
        const password: string = await BcryptUtilities.getHashedValue(_password);
        const passwordStrength: string = RequestMapperUtilities.getPasswordStrength(_password);

        return {
            id: _id,
            password,
            passwordStrength
        }
    }

    /**
     * Maps Update Last Login Request
     *
     * @param _id
     * @return update last login request
     */
    static mapUpdateLastLoginRequest(_id: string): UpdateLastLoginRequest {
        return {
            id: _id,
            lastLogin: moment().format('MMMM Do YYYY, h:mm:ss a'),
        };
    }

    /**
     * Retrieves Password Strength (custom scale)
     *
     * @param password (unhashed)
     * @return password strength
     */
    static getPasswordStrength(password: string): string {
        const score = validator.isStrongPassword(password, {
            minLength: 7,
            minLowercase: 0,
            minUppercase: 0,
            minNumbers: 0,
            minSymbols: 0,
            returnScore: true,
        });

        if (score >= 40) {
            return 'STRONG';
        }
        if (score < 40 && score >= 30) {
            return 'MEDIUM';
        }
        if (score < 30) {
            return 'WEAK';
        }
    }
}
