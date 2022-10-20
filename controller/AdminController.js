const { Sign } = require("crypto");
const express = require("express");
const session = require("express-session");
const router = express.Router();
const fs = require("fs");
const Admin = require("../model/Admin");
const Product = require("../model/Product");

//-------------------------------------------

router.get("/", AdminLoginHome);
router.post("/", AdmingetLogin);
async function AdminLoginHome(yeucau, trave) {
    try {
        
        if(yeucau.session.AdminTenTK)
        {
            let data = await Admin.findOne({ TK : yeucau.session.AdminTenTK})
            console.log(data);
            trave.render("PC", {data : data});
        }
        else
        {
            trave.render("adminlogin");
        }
    } catch (error) {
        console.log(error);
    }
}

async function AdmingetLogin(yeucau, trave) {
    try {
        let tempusername = yeucau.body.username;
        let temppassword = yeucau.body.password;
        await Admin.findOne({ TK: yeucau.body.username }).exec((loi, tempuser) => {
            if (loi) { console.log(loi); return; }
            if (!tempuser) { console.log('username' + tempusername + 'not found !');  trave.redirect("/Admin"); return; }
            if (tempuser) { console.log('username ' + tempusername + ' checking password'); }
            if (tempuser.MK !== temppassword) { console.log(temppassword + 'password wrong'); trave.redirect("/Admin"); return; }
            if (tempuser.MK === temppassword) { console.log('user ' + tempuser.TK + ' login ok'); 
            yeucau.session.AdminTenTK = yeucau.body.username;
            yeucau.session.AdminMatKhau = yeucau.body.password;
            trave.redirect("/PC");
            return; }
        }
        );
    } catch (error) {
        console.log(error);
    }
}

router.get('/logout', (req, res) => {
    if (req.session.AdminTenTK) {
        req.session.destroy()
        res.clearCookie('connect.sid') // clean up!
        res.redirect("/Admin");
    } else {
        res.redirect("/Admin");
    }
})

//-------------------------------------------
exports.AdminRouter = router;
