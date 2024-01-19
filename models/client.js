const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const ClientSchema = mongoose.Schema({
  name: String, 
  ci: {
    type: String,
    unique: true,
  },
  grade: String,
  phone:String,
  city:String 
});
ClientSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Client", ClientSchema);
