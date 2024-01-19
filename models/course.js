const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const CourseSchema = mongoose.Schema({
  title: String,
  price: Number,
  workload: Number,
  // urlimage: String,
  miniature:String //para borrar
});


CourseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Course", CourseSchema);
