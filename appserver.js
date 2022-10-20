const  express = require("express");
const PORT = process.env.PORT || 80;
const appServer = express();
const router = express.Router();
const fs = require("fs");
const path = require('path');
//session 
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const oneDay = 1000 * 60 * 60 * 24;
appServer.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay, 
            TenTK: "",
            MatKhau: ""},
    resave: false 
}));
appServer.use(express.json());
appServer.use(express.urlencoded({ extended: true }));


appServer.use(express.static(__dirname));
appServer.use(cookieParser());

// Middleware
const bodyParser = require("body-parser");
// ---- 
//view engine setup
appServer.set("views", path.join(__dirname, "view")); //setting views directory for views.
appServer.set("view engine", "hbs"); //setting view engine as handlebars


// Config
appServer.use(express.static("public"));

///// -------------------Database
const mongoose = require('mongoose');

const accUN = "user202210";
const accPW = "g51leZHfXqsJKH4f";
const dnsServer = "cluster0.azn5qeo.mongodb.net";
const dbName = "Shop_2022_10";

const uri = "mongodb+srv://"
+ accUN + ":" + accPW
+ "@" + dnsServer + "/" + dbName + "?retryWrites=true&w=majority";

const db = mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
});

// ------------------- Middleware - kiem soat tinh huong
router.use( (yeucau, trave, ketiep) => { 
    console.log("REQ: ", Date.now(), yeucau.url);
    ketiep();
});

router.use( (loixayra, yeucau, trave, ketiep) => { 
    console.log("ERROR: ", Date.now(), yeucau.url);
    console.log(loixayra);
    trave.status(500).send("Dang co loi xay ra, chua biet o dau !!!");
});

// ------------------- Routing
router.get( "/" , (yeucau, trave) => {
    trave.render("userviewhomepage", {TenTrang: "Main Chinh !!!"} );
});

router.get( "/home" , (yeucau, trave) => {
    trave.render("home", {TenTrang: "Home Nha !!!"});
});

router.get( "/about" , (yeucau, trave) => {
    trave.render("about", {TenTrang: "About Nha !!!"});
});

//--- Add middleware
//const session = express.session();
appServer.use(bodyParser.json());
// không được copy thiếu nữa
appServer.use(bodyParser.urlencoded({ extended: true }));
//appServer.use(session({secret: "id-session-Mr.Tu"​}));


// ------------------------- Add Router / Controller
appServer.use("/", router);

const ProductRouter = require("./controller/productController").ProductRouter;
appServer.use("/products", ProductRouter);

const LoginRouter = require("./controller/loginController").LoginRouter;
appServer.use("/login", LoginRouter);

const PCRouter = require("./controller/PCController").PCRouter;
appServer.use("/PC", PCRouter);

const CategoryRouter = require("./controller/CategoryController").CategoryRouter;
appServer.use("/Category", CategoryRouter);

const UserRouter = require("./controller/UserController").UserRouter;
appServer.use("/User", UserRouter);

const AdminRouter = require("./controller/AdminController").AdminRouter;
appServer.use("/Admin", AdminRouter);




// ----------- RUN / Launching !!! 
appServer.listen( PORT );

console.log("Web da mo tai " + PORT);