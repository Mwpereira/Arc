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
    type: Number,
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
  },
});
