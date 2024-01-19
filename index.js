const mongoose = require("mongoose");
const app = require("./app");
const {IP_SERVER,IP_DATABASE,PORT_DB,DB_USER,DB_PASSWORD,DB_HOST,URI,options} = require("./constants");
const PORT = process.env.POST || 3977;



mongoose.connect(URI,options,
//MongoClient.connect(URI,

  // local
  //`mongodb://${IP_DATABASE}:${PORT_DB}/rising`, 
  //montado el mongoatlas
 //  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`, 

  (error) => {
    if (error) throw error;

    app.listen(PORT, () => {
      
      console.log("######################");        
      console.log("Corriendo en:");
      console.log(`http://${IP_SERVER}:${PORT}`);   
      console.log("######################");
      console.log("Base de datos local:");
      console.log(`mongodb://${IP_DATABASE}:${PORT_DB}/rising`);
      // console.log("Base de datos Mongo Atlas:");
      // console.log(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`);
      console.log("######################");
      
      // console.log(` base de datos: mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`);
    });
  }
);
