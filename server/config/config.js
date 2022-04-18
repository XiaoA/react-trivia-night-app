require('dotenv').config();

 module.exports = {
  development: {
    username: process.env.DEV_DATABASE_USER,
    password: process.env.DEV_DATABASE_PASSWORD,
    database: process.env.DEV_DATABASE_DB,
    dialect: 'postgres',
  },
  test: {
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: '127.0.0.1',
    port: 5000,
    dialect: 'postgres',
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT,
    dialect: 'postgres',
  }
};
