require('dotenv').config();

const { DB_USERNAME, DB_PASSWORD, DB_HOST, JWT_SECRET_KEY } = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: 'chat_development',
    host: DB_HOST,
    dialect: 'postgres',
    jwtSecretKey: JWT_SECRET_KEY,
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: 'chat_test',
    host: DB_HOST,
    dialect: 'postgres',
    jwtSecretKey: JWT_SECRET_KEY,
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: 'chat_production',
    host: DB_HOST,
    dialect: 'postgres',
    jwtSecretKey: JWT_SECRET_KEY,
  },
};
