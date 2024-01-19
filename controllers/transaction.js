const Transaction = require("../models/transaction");
const mongoose = require('mongoose');

async function getVerificateTransaction(req, res) {
  const { transactionid } = req.params; 
  try {
    const response = await Transaction.findOne({code:transactionid}).populate('clientid').populate('course');
    console.log(response)

    if (!response) {
      return res.status(400).send({ msg: "Verifique el código" });
    } else {
      // console.log(response);
      return res.status(200).send({
        course: response.course.title,
        clientname: response.clientid.name,
        grade:response.clientid.grade,
        id: response.code
      });
    }
  } catch (error) {
    return res.status(500).send({ msg: "Error en el servidor" });
    
  }
}

async function getTransactions(req, res) { 
  const clientid=req.params.clientid; 
    try {
      const transactions = await Transaction.find({clientid:clientid}).populate('course').populate('clientid');      
      console.log(transactions)
      if (transactions) {
        const data=transactions.map(trans=>{
         return{
          course:trans.course.title,
          clientci:trans.clientid.ci,
          clientname:trans.clientid.name,
          clientid:trans.clientid._id,
          date:trans.date,
          grade:trans.clientid.grade,
          state:trans.state,
          code:trans.code,
          _id:trans._id,
         }
        })
        // console.log(data)
        res.status(200).send(data);
      } else {
        res.status(404).send({msg:'usuario no encontrado'});
      }
    } catch (error) {
      res.status(500).send({msg:'se produjo un error'});
      // Manejar el error, si es necesario
    }
    
}
// async function createTransaction(req, res) {
//   const data= req.body;  
//     const numeros = Math.floor(1000 + Math.random() * 9000);
//     const letras = Array.from({ length: 4 }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
//   const codigo=`${numeros}-${letras}`;
//   console.log(codigo)
//   try{
//   const date= new Date()

//     const response= await Transaction.findOne({code:codigo})  

//     if(!response){
//     const promiseCompras = data.courses?.map(compra => {
//       const nuevaCompra = new Transaction({
//         course: compra.title,      
//         clientci:data.clientci,
//         clientname: data.clientname,
//         clientid: data.clientid,
//         price: compra.price,
//         seller:data.seller,
//         code:codigo,
//         date,
//         grade:data.grade,
//         state:false,
//       });
//       return nuevaCompra.save();
//     }); 
//     await Promise.all(promiseCompras);
//     return  res.status(200).send({ msg: "Registrado correctamente" });
//     }
//     else{
//       res.status(400).send({ msg: "se produjo un error" });
//     }

// }catch(err){
//   console.log('c')
//   res.status(400).send({ msg: "se produjo un error" });
//   // console.log(err)
// }
// }
// async function createTransaction(req, res) {
//   try {
//     const { courses, clientci, clientname, clientid, seller, grade } = req.body;
    
//     const numeros = Math.floor(1000 + Math.random() * 9000);
//     const letras = Array.from({ length: 4 }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
//     const codigo = `${numeros}-${letras}`;
    
//     const existingTransaction = await Transaction.findOne({ code: codigo });
//     if (existingTransaction) {
//       return res.status(400).send({ msg: "Ya existe una transacción con este código" });
//     }
//     const date = new Date();
//     const promiseCompras = courses?.map(compra => new Transaction({
//       course: compra.title,
//       clientci,
//       clientname,
//       clientid,
//       price: compra.price,
//       seller,
//       code: codigo,
//       date,
//       grade,
//       state: false,
//     }).save());
    
//     await Promise.all(promiseCompras);
//     return res.status(200).send({ msg: "Registrado correctamente" });
//   } catch (err) {
//     console.error('Error al crear transacción:', err);
//     return res.status(400).send({ msg: "Se produjo un error al procesar la solicitud" });
//   }
// }
// async function createTransaction(req, res) {
//   try {
//     const { courses, clientci, clientname, clientid, seller, grade } = req.body;
//     let cont=0
//     const generateUniqueCode = async () => {
//       const numeros = Math.floor(1000 + Math.random() * 9000);
//       const letras = Array.from({ length: 4 }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
//       const codigo = `${numeros}-${letras}`;
//       const existingTransaction = await Transaction.findOne({ code: codigo});
//       if(cont>5){
//         return null
//       }
//       if (existingTransaction) {
//         cont=cont+1;
//         console.log(cont)
//         console.log ('repedido')
//         return generateUniqueCode(); // Llamada recursiva si se encuentra un código existente
//       } 
//       else {
//         return codigo; // Retorna el código único
//       }
//     };

//     const codigo = await generateUniqueCode();
//     if(codigo!==null){
//       const date = new Date();
//       const promiseCompras = courses?.map(compra => new Transaction({
//         course: compra.title,      
//         clientid,
//         price: compra.price,
//         seller,
//         code: codigo,
//         date,    
//         state: false,
//       }).save());
//       await Promise.all(promiseCompras);
//       return res.status(200).send({ msg: "Registrado correctamente" });
//     }
//     else{
//       return res.status(400).send({ msg: "Se produjo un error al procesar la solicitud" });
//     }
   

//   } catch (err) {
//     console.error('Error al crear transacción:', err);
//     return res.status(400).send({ msg: "Se produjo un error al procesar la solicitud" });
//   }
// }
async function createTransaction(req, res) {
  try {
    const { courses,clientid, seller } = req.body;
 
    const date = new Date();
    const promiseCompras = courses?.map(async compra => {
      const generateUniqueCode = async () => {
        const numeros = Math.floor(1000 + Math.random() * 9000);
        const letras = Array.from({ length: 4 }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
        const codigo = `${numeros}-${letras}`;
        const existingTransaction = await Transaction.findOne({ code: codigo });
        if (existingTransaction) {
          return generateUniqueCode(); 
        } else {
          return codigo; 
        }
      };
      const codigo = await generateUniqueCode();

      return new Transaction({
        course: compra.title,       
        clientid,
        price: compra.price,
        seller,
        code: codigo,
        date,
        state: false,
      }).save();
    });

    await Promise.all(promiseCompras);

    return res.status(200).send({ msg: "Registrado correctamente" });
  } catch (err) {
    console.error('Error al crear transacción:', err);
    return res.status(400).send({ msg: "Se produjo un error al procesar la solicitud" });
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
    const transactions = await Transaction.find({state:false}).populate('course').populate('clientid');     ;      
    if (transactions) {     
      const data=transactions.map(trans=>{
        return{
         course:trans.course.title,
         clientci:trans.clientid.ci,
         clientname:trans.clientid.name,
         clientid:trans.clientid._id,
         date:trans.date,
         code:trans.code,
         grade:trans.clientid.grade,
         state:trans.state,
         _id:trans._id,
        }
       })
      res.status(200).send(data);
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
