const { Sign } = require("crypto");
const  express = require("express");
const  router = express.Router();
const fs = require("fs");
const Signup = require("../model/Signup");

//-------------------------------------------


router.get( "/" , LoginHome);

async function LoginHome(yeucau, trave) {
    try {
        let dssp = await Signup.find({});
        console.log(dssp);
        trave.render("login", {Cac: dssp});
    } catch (error) {
        console.log(error);
    }
}

router.get( "/signup" , (yeucau, trave) => {
    trave.render("signup");
});

router.post( "/signup" , (yeucau, trave) => {
    console.log("\n BODY: ", yeucau.body);
    console.log("\n Params: ", yeucau.params);
    console.log("\n Query: ", yeucau.query);

    signup = new Signup(yeucau.body);
    
    signup.save();
    trave.render("login", {Cac: dssp});
});

router.get( "/1nguoi" , (yeucau, trave) => {
    pageContent = "1 nguoi !!!";
    trave.send(pageContent);
});

router.get( "/2nguoi" , (yeucau, trave) => {
    pageContent = "2 nguoi !!!";
    trave.send(pageContent);
});

//-------------------------------------------
exports.LoginRouter = router;
