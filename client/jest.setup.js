const jestEnv = require('./jest.env.json');

process.env.TEST_EMAIL = jestEnv.TEST_EMAIL;
process.env.TEST_USERNAME = jestEnv.TEST_USERNAME;
process.env.TEST_PASSWORD = jestEnv.TEST_PASSWORD;

jest.setTimeout(60000);
