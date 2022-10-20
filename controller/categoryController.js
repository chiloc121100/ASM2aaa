const  express = require("express");
const  router = express.Router();
const fs = require("fs");
const Product = require("../model/Product");
const Category = require("../model/Category");
const Admin = require("../model/Admin");

router.get( "/" , CategoryHome);
async function CategoryHome(yeucau, trave) {
    try {
      if(yeucau.session.AdminTenTK)
      {
          let data = await Admin.findOne({ TK : yeucau.session.AdminTenTK})
          let CacSanPham = await Category.find({});
          let temptestlogin = true;
          trave.render("listcategory", {CacSanPham,data,temptestlogin});
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
router.get( "/newcategory" , async(yeucau, trave) => {
  if(yeucau.session.AdminTenTK)
  {
      let data = await Admin.findOne({ TK : yeucau.session.AdminTenTK})
      console.log(data);
      let dscategory = await Category.find({});
      let temptestlogin = true;
      trave.render("newcategory", {dscategory,data,temptestlogin});
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

router.post( "/newcategory" , (yeucau, trave) => {
    console.log("\n BODY: ", yeucau.body);
    console.log("\n Params: ", yeucau.params);
    console.log("\n Query: ", yeucau.query);

    oneproduct = new Category(yeucau.body);
    oneproduct.save();

    trave.redirect("/Category");
});

router.get("/delete/:id", function (req, res, next) {
    Category.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
        res.redirect('/Category')
      } else {
        console.log(err)
      }
    })
  })

router.get("/edit/:id", async (yeucau, trave, next) => {
    try{
    if(yeucau.session.AdminTenTK)
    {
        let data = await Admin.findOne({ TK : yeucau.session.AdminTenTK})
        console.log(data);
        let temptestlogin = true;
        const id = yeucau.params.id;
        let dataid = await Category.find({ _id : id})
        // console.log(data);
        // trave.render("editpc", {CacSanPham: data});
        trave.render("editcategory", {data,temptestlogin,dataid});
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

router.post( "/updateCate" , async (yeucau, trave) => {
    const id = yeucau.body.id;
    console.log("id = " + id)
    console.log(yeucau.body);
    await Category.findByIdAndUpdate(id,yeucau.body);
    trave.redirect("/Category");
});
exports.CategoryRouter = router;