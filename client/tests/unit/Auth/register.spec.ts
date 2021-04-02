import {AxiosResponse} from "axios";
import {MessageConstants} from "../../utilities/message-constants";
import * as faker from "faker";
import {registerRequest} from "../utilities/common-utilities";

let response: AxiosResponse;
const email = process.env.TEST_EMAIL;
const username = process.env.TEST_USERNAME;

describe("Register", () => {
    async function validRequest(user: any) {
        response = await registerRequest(user);
        expect(response.status).toEqual(201);
        expect(response.data.message).toEqual(MessageConstants.USER_CREATED);
    }

    async function invalidRequest(user: any, valueExists?: string) {
        response = await registerRequest(user);
        if (valueExists) {
            if (valueExists === "EMAIL") {
                expect(response.status).toEqual(409);
                expect(response.data.message).toEqual(MessageConstants.EMAIL_TAKEN);
            } else {
                expect(response.status).toEqual(409);
                expect(response.data.message).toEqual(MessageConstants.USERNAME_TAKEN);
            }
        } else {
            expect(response.status).toEqual(400);
            expect(response.data.message).toEqual(MessageConstants.INVALID_REQUEST);
        }
    }

    test("valid user object", async () => {
        await validRequest({
            user: {
                email: faker.internet.email(),
                username: "arc" + faker.random.alphaNumeric(9),
                password: faker.random.alphaNumeric(7)
            }
        });
    });

    test("invalid user object", async () => {
        await invalidRequest({
            user: {
                username: "arc" + faker.random.alphaNumeric(9),
                password: faker.random.alphaNumeric(7)
            }
        });

        await invalidRequest({
            user: {
                email: faker.internet.email(),
                password: faker.random.alphaNumeric(7)
            }
        });

        await invalidRequest({
            user: {
                email: faker.internet.email(),
                username: "arc" + faker.random.alphaNumeric(9),
            }
        });

        await invalidRequest({
            user: {
                email: faker.internet.email(),
                username: "arc" + faker.random.alphaNumeric(9),
            }
        });
    });

    test("email already exists", async () => {
        await invalidRequest({
            user: {
                email: email,
                username: "arc" + faker.random.alphaNumeric(9),
                password: faker.random.alphaNumeric(7)
            }
        }, "EMAIL");
    });

    test("username already exists", async () => {
        await invalidRequest({
            user: {
                email: faker.internet.email(),
                username: username,
                password: faker.random.alphaNumeric(7)
            }
        }, "USERNAME");
    });

    test("invalid email", async () => {
        await invalidRequest({
            user: {
                email: "arc" + faker.random.alphaNumeric(9),
                username: "arc" + faker.random.alphaNumeric(9),
                password: faker.random.alphaNumeric(7)
            }
        });
    });

    test("invalid username", async () => {
        await invalidRequest({
            user: {
                email: faker.internet.email(),
                username: faker.random.alphaNumeric(2),
                password: faker.random.alphaNumeric(7)
            }
        });

        await invalidRequest({
            user: {
                email: faker.internet.email(),
                username: faker.random.uuid(),
                password: faker.random.alphaNumeric(7)
            }
        });
    });

    test("invalid password", async () => {
        await invalidRequest({
            user: {
                email: faker.internet.email(),
                username: "arc" + faker.random.alphaNumeric(9),
                password: faker.random.alphaNumeric(5)
            }
        });
    });
});
