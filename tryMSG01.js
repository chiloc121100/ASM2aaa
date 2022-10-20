
///// -------------------Database
const mongoose = require('mongoose');

const accUN = "user202210";
const accPW = "d3Z2x7JQEzUcdeDJ";
const dnsServer = "cluster0.s7ukh.mongodb.net";
const dbName = "Shop_2022_10";

const uri = "mongodb+srv://"
+ accUN + ":" + accPW
+ "@" + dnsServer + "/" + dbName + "?retryWrites=true&w=majority";


const db = mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
 });

 /*
 .once("open", _ => {
    console.log("DB connected !!!");
 })
 .on("error", err => {
    console.log("ERR: ", err);
 });
 */



 

////// - Model
const Product = require("./model/Product");



newRecord = new Product( {
    MaSP: "QM-0711",
    TenSP: "Quat may kich co KO nho",
    MoTaSP: "Day la quat may 30w, kich co 500cms", 
    ImageLink: "https://www.google.com/aclk?sa=l&ai=DChcSEwi18_aKwcj6AhXommYCHeAsDLYYABAFGgJzbQ&sig=AOD64_1k0xf9zsEontnjX_xO5kR369e9qQ&adurl&ctype=5&ved=2ahUKEwi4xOuKwcj6AhV1mdgFHYXUB38Qvhd6BAgBEFQ",
    Price: 579000,
    SoLuongConTrongKho: 3000,
});


newRecord.save(
    (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Data: ", doc);
        }

    });