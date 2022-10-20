const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    TK: String,
    MK: String,
    Name: String,
});

module.exports = mongoose.model("Admin", AdminSchema);