
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    MaSP: String,
    TenSP: String,
    MoTaSP: String, 
    ImageLink: String,
    Price: Number,
    SoLuongConTrongKho: Number,
    Category: String,
});

module.exports = mongoose.model("Product", ProductSchema);