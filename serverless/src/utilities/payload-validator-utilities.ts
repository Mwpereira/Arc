import assert from 'assert';
import * as uuid from 'uuid';
import * as validator from 'validator';
import {Category} from '../enums/category';
import {AuthorizeUserRequest} from '../interfaces/authorize-user-request';
import {RegisterRequest} from '../interfaces/register-request';

export default class PayloadValidator {
    /**
     * Validates Register Request
     */
    static validateRegister(request: any): RegisterRequest {
        this.validateEmail(request.email);
        this.validateUsername(request.username);
        this.validatePassword(request.password);
        return request;
    }

    /**
     * Validates Login Request
     */
    static validateLogin(request: any): AuthorizeUserRequest {
        assert(request.username);
        assert(request.password);
        return request;
    }

    /**
     * Validates Email
     */
    static validateEmail(email: string): string {
        assert(validator.isEmail(email));
        assert(email.length <= 128);
        return email;
    }

    /**
     * Validates Username
     */
    static validateUsername(username: string): string {
        assert(validator.isAlphanumeric(username));
        assert(username.length > 2 && username.length < 19);
        return username;
    }

    /**
     * Validates Password
     */
    static validatePassword(password: any): string {
        assert(password.length > 6);
        return password;
    }

    /**
     * Validates Update Password
     */
    static validateUpdatePassword(request: any): any {
        this.validatePassword(request.currentPassword);
        this.validatePassword(request.newPassword);
        return request;
    }

    /**
     * Validates Id
     */
    static validateId(id: any): string {
        assert(uuid.validate(id));
        return id;
    }

    /**
     * Validates Account
     */
    static validateAccount(request: any): any {
        assert(request.accountName);
        assert(request.accountName.length <= 32);

        if (request.email !== '') {
            this.validateEmail(request.email);
        }

        if (request.username !== '') {
            assert(request.username.length <= 32);
        }

        if (request.password !== '') {
            assert(request.password.length <= 32);
        }

        assert(Object.values(Category).includes(request.category))

        if (request.notes !== '') {
            assert(request.notes.length <= 250);
        }

        return request;
    }

    /**
     * Validate Update Account Request
     */
    static validateUpdateAccount(request: any): any {
        assert(request.id);
        this.validateAccount(request);
        return request;
    }

    /**
     * Validates Delete User Request
     */
    static validateDeleteUser(request: any): any {
        this.validateEmail(request.email);
        this.validateUsername(request.username);
        return request;
    }
}
