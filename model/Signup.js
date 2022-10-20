const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SignupSchema = new Schema({
    TK: String,
    MK: String,
    Name: String,
});

module.exports = mongoose.model("Signup", SignupSchema);