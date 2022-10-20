const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    TK: String,
    MK: String,
    Name: String,
});

module.exports = mongoose.model("User", UserSchema);