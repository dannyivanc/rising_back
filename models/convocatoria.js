const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const ConvocatoriaSchema = mongoose.Schema({
  title: String,
  position:String,
  date:String,
  hour:String,
  pay:Number,
  location:String,
  cv:Boolean,
  forms:Boolean,
  courses:[String],
  path:String
  // courses: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Convocatoria' // Hace referencia al modelo 'Usuario'
  // }]

});

ConvocatoriaSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Convocatoria", ConvocatoriaSchema);
