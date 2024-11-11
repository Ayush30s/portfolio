const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  gender: String,
  designation: String,
  location: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // New field to store user ID who created this employee
});

module.exports = mongoose.model("Employee", employeeSchema);
