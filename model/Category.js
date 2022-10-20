const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    MaCategory: String,
    MotaCategory: String,
});

module.exports = mongoose.model("Category", CategorySchema);