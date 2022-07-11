var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var crudSchema = new Schema({
  name: {
    type: String,
    required: "Enter the name",
  },
  email: {
    type: String,
    required: "Enter the email",
  },
  gender: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  country: {
    type: String,
  },
  hobby: [],
  password: {
    type: String,
  },
  image: []
});
module.exports = mongoose.model("crudSchema", crudSchema);
