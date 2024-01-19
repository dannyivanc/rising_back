const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String, 
  username: {
    type: String,
    unique: true,
  },
  password: String,
  role: String,
  active: Boolean,
});

module.exports = mongoose.model("User", UserSchema);
