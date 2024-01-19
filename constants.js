require('dotenv').config();
const JWT_SECRET_KEY ="gR7cH9Svfj8JLe4c186Ghs48hheb3902nh5DsA"//param montar en mongoatlas
const DB_USER = 'risingconsultora';
const DB_PASSWORD = 'CarlaZarate123cy';
const DB_HOST = 'rising.vvsv0r1.mongodb.net';
//const URI= `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`; //para mongo atlas

//para el vps y pruevas
const IP_DATABASE = '192.95.21.32';
const PORT_DB = '17777';
const IP_SERVER = 'localhost';

const USERNAME = 'mongodb_vps_user';
const PASSWORD = 'mongodb_vps_pass';
const DATABASE = 'rising';
//const DATABASE = 'admin';

const options= {
  useNewUrlParser: true , 
  useUnifiedTopology:true,
  authSource:'admin',
 
};
//const URI = 'mongodb://usuario:contraseña@nombre-del-contenedor-mongo:27017/nombreDeTuBaseDeDatos';


//para local pruevas
//const URI = `mongodb://${IP_DATABASE}:${PORT_DB}/${DATABASE}`  //para local pruevas

//para el vps con user y password
const URI= `mongodb://${USERNAME}:${PASSWORD}@${IP_DATABASE}:${PORT_DB}/${DATABASE}`;
//const URI= `mongodb://${USERNAME}:${PASSWORD}@$mongo6.0.4:${PORT_DB}/${DATABASE}`;
//const URI = 'mongodb://mongo_vps_user:mongo_vps_pass@192.95.21.32:17777/rising';





console.log(URI)


module.exports = {
  JWT_SECRET_KEY,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  IP_DATABASE,
  PORT_DB,
  IP_SERVER,
  URI,
  options
};
