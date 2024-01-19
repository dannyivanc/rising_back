require('dotenv').config();

const JWT_SECRET_KEY ="gR7cH9Svfj8JLe4c186Ghs48hheb3902nh5DsA"
//param montar
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

const IP_DATABASE = process.env.IP_DATABASE;
const PORT_DB = process.env.PORT_DB;
const IP_SERVER = process.env.IP_SERVER;





module.exports = {
  JWT_SECRET_KEY,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  IP_DATABASE,
  PORT_DB,
  IP_SERVER
};
