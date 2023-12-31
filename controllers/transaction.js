const Transaction = require("../models/transaction");
const mongoose = require('mongoose');

async function getVerificateTransaction(req, res) {
  const { transactionid } = req.params;
  console.log(req.params)
  if (!mongoose.Types.ObjectId.isValid(transactionid)) {
    return res.status(400).send({ msg: "El codigo no es válido" });
  }
  try {
    const response = await Transaction.findById(transactionid);

    if (!response) {
      return res.status(400).send({ msg: "Verifique el código" });
    } else {
      // console.log(response);
      return res.status(200).send({
        course: response.course,
        clientname: response.clientname,
        grade:response.grade,
        id: response._id
      });
    }
  } catch (error) {
    return res.status(500).send({ msg: "Error en el servidor" });
    
  }
}

async function getTransactions(req, res) { 
  const clientid=req.params.clientid; 
    try {
      const transactions = await Transaction.find({clientid:clientid});      
      if (transactions) {
        console.log(transactions)
        res.status(200).send(transactions);
      } else {
        res.status(404).send({msg:'usuario no encontrado'});
      }
    } catch (error) {
      res.status(500).send({msg:'se produjo un error'});
      // Manejar el error, si es necesario
    }
    
}

async function createTransaction(req, res) {
  const data= req.body;
  try{
  const date= new Date()
  const promiseCompras = data.courses?.map(compra => {
    const nuevaCompra = new Transaction({
      course: compra.title,      
      clientci:data.clientci,
      clientname: data.clientname,
      clientid: data.clientid,
      price: compra.price,
      seller:data.seller,
      date,
      grade:data.grade,
      state:false,
    });
    return nuevaCompra.save();
  });

  await Promise.all(promiseCompras);
return  res.status(200).send({ msg: "Registrado correctamente" });
}catch(err){
  res.status(400).send({ msg: "se produjo un error" });
  // console.log(err)
}
}



async function deleteTransaction(req, res) {
  const { id } = req.params;
  Transaction.findByIdAndDelete(id, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al eliminar el cliente" });
    } else {
      res.status(200).send({ msg: "Cliente eliminado" });
    }
  });
}



async function getTransactionsSend(req, res) { 
  try {
    const transactions = await Transaction.find({state:false});      
    if (transactions) {     
      res.status(200).send(transactions);
    } else {
      res.status(404).send({msg:'No existen envios pendientes'});
    }
  } catch (error) {
    res.status(500).send({msg:'Se produjo un error'});
    // Manejar el error, si es necesario
  }
}

async function updateTransaction(req, res) {
  const { id } = req.params;
  Transaction.findByIdAndUpdate({ _id: id },{ $set: { state: true } }, { new: true }, (error) => {
    if (error) {
      console.log('asd')
      res.status(400).send({ msg: "Error al actualizar la compra" });
    } else {
      res.status(200).send({ msg: "Actualizacion correcta" });
    }
  });
}
module.exports = { 
  getVerificateTransaction,
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionsSend
};
