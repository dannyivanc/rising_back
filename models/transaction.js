const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  course:String,
  clientci:String,
  clientname:String,
  clientid:String,
  price:Number,
  seller:String,
  date:Date,
  grade:String,
  state:Boolean,
  
  


});

module.exports = mongoose.model("transaction", transactionSchema);
