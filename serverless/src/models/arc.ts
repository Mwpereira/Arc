import * as DynamoDB from 'dynamoose';

export const ArcSchema = new DynamoDB.Schema({
    id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    passwordStrength: {
        type: String,
        required: false,
    },
    accounts: {
        type: String,
        required: true,
    },
    lastLogin: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        required: true,
    },
});
