const Client = require("../models/client");
const Transaccion = require("../models/transaction");


async function getClients(req, res) {    
    const response = await Client.find();
    const reversedResponse = response.reverse();
  res.status(200).send(reversedResponse);
}



async function createClient(req, res) {
  const data=req.body
  if(!data.courses ||data?.courses.length === 0 ){ 
    const client = new Client(data);  
    client.save((error, clientStored) => {
      if (error) {                   
        res.status(400).send({ msg: 'Usuario ya registrado, verificar el numero de carnet' });
      } 
      else {     
        res.status(200).send({ msg: 'Registrado correctamente' });
      }
    });
  }
  else{
    try {
      const { courses, seller } = req.body;     
      const date = new Date();
      const client = new Client(data); 
      const clientStored =  await new Promise((resolve, reject) => {
        client.save((error, clientStored) => {
          if (error) {      
            console.log('b') 
            reject('Cliente ya registrado, verifique el carnet');
          } 
          else {      
            // res.status(201).send(clientStored);
            resolve(clientStored);
          }
        });
      });
      const promiseCompras = courses?.map(async compra => {
        const generateUniqueCode = async () => {
          const numeros = Math.floor(1000 + Math.random() * 9000);
          const letras = Array.from({ length: 4 }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
          const codigo = `${numeros}-${letras}`;
          const existingTransaction = await Transaccion.findOne({ code: codigo });
          if (existingTransaction) {
            return generateUniqueCode(); 
          } else {
            return codigo; 
          }
        };
        const codigo = await generateUniqueCode();
        return new Transaccion({
          course: compra.course_id,       
          clientid:clientStored._id,
          price: compra.price,
          seller,
          code: codigo,
          date,
          state: false,
        }).save();
      });
      await Promise.all(promiseCompras);
       res.status(200).send({ msg: "Registrado correctamente" });
    } catch (err) {
      console.error('Error al crear cliente:', err);
      res.status(400).send({ msg: err });
    }
    // try{
    //   const date= new Date()
    //   const client = new Client( data); 
      // const clientStored =  await new Promise((resolve, reject) => {
      //   client.save((error, clientStored) => {
      //     if (error) {      
      //       res.status(409).send({ msg: "Usuario ya registrado" });
      //       reject(error);
      //     } 
      //     else {      
      //       res.status(201).send(clientStored);
      //       resolve(clientStored);
      //     }
      //   });
      // });
    //   const promiseCompras = data.courses.map(compra => {
    //     const nuevaCompra = new Transaccion({
    //       price: compra.price,  
    //       date,
    //       state:false,
    //       course: compra.course_id,      
    //       clientid: clientStored._id,
    //       seller:data.seller,
    //     });
    //     return nuevaCompra.save();
    //   });
    //   await Promise.all(promiseCompras);
    //   console.log('Compras guardadas:', await Promise.all(promiseCompras));   
    // }catch(err){
    //   console.log('errorie')
    //   console.log(err)
    // }
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
  try {
    await Client.findByIdAndDelete(id);
    await Transaccion.deleteMany({ clientid: id });   
    res.status(200).send({ msg: "Cliente eliminado" });
  } catch (error) {     
    res.status(500).send({ msg: "Error al eliminar el cliente" });
  }

  // Client.findByIdAndDelete(id, (error) => {
  //   if (error) {
  //     res.status(400).send({ msg: "Error al eliminar el cliente" });
  //   } else {
  //     Transaccion.deleteMany({ clientid:id  });
  //     res.status(200).send({ msg: "Cliente eliminado" });
  //   }
  // });
}

module.exports = { 
  getClients,
  createClient,
  updateClient,
  deleteClient, 
};
