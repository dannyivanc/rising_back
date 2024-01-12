const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const CourseSchema = mongoose.Schema({
  title: String,
  price: Number,
  workload: Number,
  urlimage: String,
});


CourseSchema.plugin(mongoosePaginate);

// module.exports = mongoose.model("Course", CourseSchema);
