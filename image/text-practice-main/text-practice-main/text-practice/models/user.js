const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true });

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
