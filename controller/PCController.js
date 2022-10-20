const  express = require("express");
const  router = express.Router();
const fs = require("fs");

////// - Model
const Product = require("../model/Product");
const Category = require("../model/Category");
const Admin = require("../model/Admin");

// router.use( async function(yeucau,trave,next)
// {
//     if(yeucau.session.AdminTenTK)
//     {
//         let data = await Admin.findOne({ TK : yeucau.session.AdminTenTK})
//         console.log(data);
//         let CacSanPham = await Product.find({});
//         console.log(CacSanPham);
//         let temptestlogin = true;
//         trave.render("listpc", {CacSanPham,data,temptestlogin});
//     }
//     else
//     {
//         trave.redirect("/Admin");
//     }
//     next();
// });

router.get( "/" , PCHome);
async function PCHome(yeucau, trave) {
    try {
        if(yeucau.session.AdminTenTK)
        {
            let data = await Admin.findOne({ TK : yeucau.session.AdminTenTK})
            console.log(data);
            let CacSanPham = await Product.find({});
            console.log(CacSanPham);
            let temptestlogin = true;
            trave.render("listpc", {CacSanPham,data,temptestlogin});
            // let dssp = await Product.find({});
            // console.log(dssp);
            // trave.render("listpc", {CacSanPham: dssp});
        }
        else
        {
            trave.redirect("/Admin");
        }
    } catch (error) {
        console.log(error);
    }
}
router.get( "/newproduct" , async (yeucau, trave) => {
    if(yeucau.session.AdminTenTK)
        {
            let data = await Admin.findOne({ TK : yeucau.session.AdminTenTK})
            console.log(data);
            let dscategory = await Category.find({});
            let temptestlogin = true;
            trave.render("newproduct", {dscategory,data,temptestlogin});
            // let dssp = await Product.find({});
            // console.log(dssp);
            // trave.render("listpc", {CacSanPham: dssp});
        }
    else
    {
        // let dscategory = await Category.find({});
        // trave.render("newproduct", {dscategory : dscategory});  
        trave.redirect("/Admin");
    }
});

router.post( "/newproduct" , (yeucau, trave) => {
    console.log("\n BODY: ", yeucau.body);
    console.log("\n Params: ", yeucau.params);
    console.log("\n Query: ", yeucau.query);

    oneproduct = new Product(yeucau.body,yeucau.body.Category); 
    oneproduct.save();

    trave.redirect("/PC");
    // trave.render("oneproduct",  {sanpham: yeucau.body});
});

router.get("/edit/:id", async (yeucau, trave, next) => {
    try{
    if(yeucau.session.AdminTenTK)
    {
        let data = await Admin.findOne({ TK : yeucau.session.AdminTenTK})
        console.log(data);
        let dscategory = await Category.find({});
        let temptestlogin = true;
        const id = yeucau.params.id;
        let dataid = await Product.find({ _id : id})
        // console.log(data);
        // trave.render("editpc", {CacSanPham: data});
        trave.render("editpc", {dscategory,data,temptestlogin,dataid});
    }
    else{
        trave.redirect("/Admin");
    // const id = yeucau.params.id;
    // let data = await Product.find({ _id : id})
    // console.log(data);
    // trave.render("editpc", {CacSanPham: data});
    
    }
    } catch (erro)
    {
        console.log(erro);
    }

})

router.post( "/updatePC" , async (yeucau, trave) => {
    const id = yeucau.body.id;
    console.log(yeucau.body);
    await Product.findByIdAndUpdate(id,yeucau.body);
    trave.redirect("/PC");
});

router.get("/delete/:id", function (yeucau, trave, next) {
    Product.findByIdAndRemove(yeucau.params.id, (err, doc) => {
      if (!err) {
        trave.redirect('/PC')
      } else {
        console.log(err)
      }
    })
  })

exports.PCRouter = router;
