/**
 * Response Messages
 */
export abstract class MessageConstants {
    /**
     * Success message for User Created
     */
    public static readonly USER_CREATED: string = 'User Created';

    /**
     * Success message for User Authorized
     */
    public static readonly USER_AUTHORIZED: string = 'Signed In';

    /**
     * Success message for Valid Token
     */
    public static readonly VALID_TOKEN: string = 'Valid Token';

    /**
     * Success message for getting Settings
     */
    public static readonly ACCOUNT_GET_SUCCESS: string = 'Retrieved Accounts';

    /**
     * Success message for adding Account
     */
    public static readonly ACCOUNT_ADD_SUCCESS: string = 'Account Added';

    /**
     * Success message for updating Account
     */
    public static readonly ACCOUNT_UPDATE_SUCCESS: string = 'Account Updated';

    /**
     * Success message for deleting Account
     */
    public static readonly ACCOUNT_DELETE_SUCCESS: string = 'Account Deleted';

    /**
     * Success message for Credentials Updated
     */
    public static readonly CREDENTIALS_UPDATE_SUCCESS: string =
        'Credentials Updated Successfully';

    /**
     * Success message for Settings Updated
     */
    public static readonly EMAIL_UPDATE_SUCCESS: string =
        'Email Updated Successfully';

    /**
     * Success message for Settings Updated
     */
    public static readonly USERNAME_UPDATE_SUCCESS: string =
        'Username Updated Successfully';

    /**
     * Success message for Settings Updated
     */
    public static readonly PASSWORD_UPDATE_SUCCESS: string =
        'Password Updated Successfully';

    /**
     * Success message for User Deleted
     */
    public static readonly USER_DELETE_SUCCESS: string =
        'User Deleted Successfully';

    /**
     * Error message for Email already in use
     */
    public static readonly EMAIL_TAKEN: string = 'Email Already Taken';

    /**
     * Error message for Email already in use
     */
    public static readonly USERNAME_TAKEN: string = 'Username Already Taken';

    /**
     * Error message for Invalid Credentials
     */
    public static readonly INVALID_CREDENTIALS: string =
        'Wrong Username/Password';

    /**
     * Error message for a Server Error
     */
    public static readonly DATABASE_ERROR: string = 'Database Error';

    /**
     * Error message for an Invalid Request
     */
    public static readonly INVALID_REQUEST: string = 'Invalid Request';

    /**
     * Error message for an Invalid Token
     */
    public static readonly INVALID_TOKEN: string = 'Invalid Token';

    /**
     * Error message for an Invalid Token
     */
    public static readonly TOKEN_NOT_FOUND: string = 'Token not found';

    /**
     * Error message for No Principal Id set on the Response
     */
    public static readonly NO_PRINCIPAL_ID: string = 'No principalId set on the Response';

    /**
     * Error message for failing to get Accounts
     */
    public static readonly ACCOUNT_GET_FAILED: string = 'Failed to get accounts';

    /**
     * Error message for Account Added
     */
    public static readonly ACCOUNT_ADD_FAILED: string = 'Failed to add account';

    /**
     * Error message for Account Deleted
     */
    public static readonly ACCOUNT_DELETE_FAILED: string =
        'Failed to delete account';

    /**
     * Error message for Account Updated
     */
    public static readonly ACCOUNT_UPDATE_FAILED: string =
        'Failed to update account';

    /**
     * Error message for Settings Updated
     */
    public static readonly EMAIL_UPDATE_FAILED: string = 'Failed to update email';

    /**
     * Error message for Settings Updated
     */
    public static readonly USERNAME_UPDATE_FAILED: string =
        'Failed to update username';

    /**
     * Error message for Password Updated
     */
    public static readonly PASSWORD_UPDATE_FAILED: string =
        'Failed to update password';

    /**
     * Error message for Password Updated
     */
    public static readonly PASSWORD_UPDATE_UNAUTH: string =
        'Unauthorized request';

    /**
     * Error message for Password Updated
     */
    public static readonly PASSWORD_UPDATE_SAME_PASSWORD: string =
        'Cannot reuse old password';
}
