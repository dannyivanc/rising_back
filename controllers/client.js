const Client = require("../models/client");
const Transaccion = require("../models/transaction");


async function getClients(req, res) {    
    const response = await Client.find();
  res.status(200).send(response);
}



async function createClient(req, res) {

  const data=req.body
  // console.log(data)
  if(!data.courses ||data?.courses.length === 0 ){ 
    const client = new Client(data); 
    client.save((error, clientStored) => {
      if (error) {      
        res.status(409).send({ msg: "Usuario ya registrado" });
      } 
      else {
        res.status(201).send(clientStored);
      }
    });
  }
  else{
    try{
      const date= new Date()
      const client = new Client( data); 
      const clientStored =  await new Promise((resolve, reject) => {
        client.save((error, clientStored) => {
          if (error) {      
            res.status(409).send({ msg: "Usuario ya registrado" });
            reject(error);
          } 
          else {      
            res.status(201).send(clientStored);
            resolve(clientStored);
          }
        });
      });
      const promiseCompras = data.courses.map(compra => {
        const nuevaCompra = new Transaccion({
          course: compra.title,      
          clientci:clientStored.ci,
          clientname: clientStored.name,
          clientid: clientStored._id,
          price: compra.price,
          seller:data.seller,
          date,
          grade:clientStored.grade,
          state:false,
        });

        return nuevaCompra.save();
      });

      await Promise.all(promiseCompras);
      console.log('Compras guardadas:', await Promise.all(promiseCompras));   
    }catch(err){
      console.log('errorie')
      console.log(err)
    }
  }


}

async function updateClient(req, res) {
  const { id } = req.params;
  const clientData = req.body;
  Client.findByIdAndUpdate({ _id: id }, clientData, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al actualizar el cliente" });
    } else {
      res.status(200).send({ msg: "Actualizacion correcta" });
    }
  });
}

async function deleteClient(req, res) {
  const { id } = req.params;
  Client.findByIdAndDelete(id, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al eliminar el cliente" });
    } else {
      Transaccion.deleteMany({ clientid:id  });
      res.status(200).send({ msg: "Cliente eliminado" });
    }
  });
}

module.exports = { 
  getClients,
  createClient,
  updateClient,
  deleteClient, 
};
