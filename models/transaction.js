const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema({
  // course:String,
  // clientci:String,
  // clientname:String,
  // clientid:String,
  // price:Number,
  // seller:String,
  // date:Date,
  // grade:String,
  // state:Boolean,


  price:Number,
  date:Date,
  state:Boolean,
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  clientid: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }


});

module.exports = mongoose.model("Transaction", TransactionSchema);
