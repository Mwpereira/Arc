import {AxiosResponse} from "axios";
import {updatePassword} from "../utilities/common-utilities";
import {MessageConstants} from "../../utilities/message-constants";
import AuthUtilities from "../utilities/auth-utilities";
import * as faker from "faker";

let response: AxiosResponse;
let auth: AuthUtilities;
let user;

describe("Update User Password", () => {
    beforeEach(async () => {
        auth = new AuthUtilities();
        user = await auth.register();
        response = await auth.login(false);
    });

    afterEach(async () => {
        await auth.deleteUser(true);
    });

    test("successfully update user password", async () => {
        response = await updatePassword({
            currentPassword: user.password,
            newPassword: faker.random.alphaNumeric(7)
        }, true);
        expect(response.status).toEqual(200);
        expect(response.data.message).toEqual(MessageConstants.PASSWORD_UPDATE_SUCCESS);
    });

    test("invalid old password", async () => {
        response = await updatePassword({
            currentPassword: faker.random.alphaNumeric(7),
            newPassword: faker.random.alphaNumeric(7)
        }, true);
        expect(response.status).toEqual(401);
        expect(response.data.message).toEqual(MessageConstants.PASSWORD_UPDATE_UNAUTH);
    });

    test("invalid new password", async () => {
        response = await updatePassword({
            currentPassword: user.password,
            newPassword: faker.random.alphaNumeric(3)
        }, true);
        expect(response.status).toEqual(400);
        expect(response.data.message).toEqual(MessageConstants.INVALID_REQUEST);
    });

    test("invalid new password is the same as old password", async () => {
        response = await updatePassword({
            currentPassword: user.password,
            newPassword: user.password
        }, true);
        expect(response.status).toEqual(400);
        expect(response.data.message).toEqual(MessageConstants.PASSWORD_UPDATE_SAME_PASSWORD);
    });

    test("invalid new password, missing newPassword field", async () => {
        response = await updatePassword({
            currentPassword: user.password,
        }, true);
        expect(response.status).toEqual(400);
        expect(response.data.message).toEqual(MessageConstants.INVALID_REQUEST);
    });

    test("invalid new password, missing currentPassword field", async () => {
        response = await updatePassword({
            newPassword: user.password
        }, true);
        expect(response.status).toEqual(400);
        expect(response.data.message).toEqual(MessageConstants.INVALID_REQUEST);
    });

    test("update user password without accessToken", async () => {
        response = await updatePassword({
            currentPassword: user.password,
            newPassword: faker.random.alphaNumeric(7)
        }, false);
        expect(response.status).toEqual(403);
        expect(response.data.message).toEqual(MessageConstants.NO_PRINCIPAL_ID);
    });
});