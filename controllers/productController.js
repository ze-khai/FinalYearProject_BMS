const ProductModel = require("../models/product.model");
const productSizeModel = require("../models/product_size.model");
const Image = require("../models/image.model");
const multer = require("multer");
const imageMiddleware = require("../middleware/store-img");

exports.readProductList = (req, res) => {
    ProductModel.getAllProduct((err, products) => {
        if (err) throw err;
        var page = req.params.page || 1;
        console.log(page);
        res.render("product", {
            title: "Inventory Management",
            product: products,
        });
    });
};

exports.readProductInCategories = (req, res) => {
    ProductModel.getAllProduct((err, products) => {
        if (err) throw err;
        var page = req.params.page || 1;
        console.log(page);
        res.render("categories", {
            title: "Categories",
            product: products,
        });
    });
};

exports.goProductDetail = (req, res) => {
    ProductModel.goUpdateProduct(req.params.productCode, (err, result) => {
        if (err) throw err;
        productSizeModel.getAllProductSize(req.params.productCode, (err, results) => {
            res.render("productDetail", {
                title: "Product Detail Page",
                product: result[0],
                size: results,
            });
        });
    });
};

exports.goUpdateProduct = (req, res) => {
    ProductModel.goUpdateProduct(req.params.productCode, (err, result) => {
        if (err) throw err;
        productSizeModel.getAllProductSize(req.params.productCode, (err, results) => {
            res.render("productUpdate", {
                title: "Inventory Management (Update Page)",
                product: result[0],
                size: results,
            });
        });
    });
};

exports.updateProduct = async (req, res, next) => {
    const productReq = new ProductModel(req.body);
    //const productFile = new ProductModel(req.files);
    //const productFile = new Image(req.files);
    ProductModel.updateProduct(productReq, (err, result) => {
        if (err) throw err;
        //console.log("PCODE = " + result);
        next();

        // Image.updateImage(productReq.productCode, (err, result) => {
        //     if (err) throw err;
        //     res.redirect("/product");
        // });
    });
};

exports.addProduct = (req, res) => {
    const productReq = new ProductModel(req.body);
    ProductModel.productAdd(productReq, (err, result) => {
        if (err) throw err;
        
        res.redirect("/product");
    });
};

exports.deleteProduct = (req, res) => {
    ProductModel.productDelete(req.params.productCode, (err, result) => {
        if (err) throw err;
        res.redirect("/product");
    });
};

exports.updateImage = async (req, res, next) => {
    //const productReq = new ProductModel(req);
    if (req.files) {
        ProductModel.updateImage(req, (err, result) => {
            if (err) throw err;
            res.redirect("/product");
            //next();
        });
    } else {
        res.redirect("/product");
    }
};

exports.searchProduct = (req, res) => {
    ProductModel.searchProduct(req, (err, result) => {
        if (err) throw err;
        res.render("product", {
            title: "Inventory Management",
            product: result,
        });
    });
};

// module.exports = {
//     imageUploadForm: function (req, res) {
//         res.render("upload-form");
//     },
//     storeImage: function (req, res) {
//         var upload = multer({
//             storage: imageMiddleware.image.storage(),
//             allowedImage: imageMiddleware.image.allowedImage,
//         }).single("image");
//         upload(req, res, function (err) {
//             if (err instanceof multer.MulterError) {
//                 res.send(err);
//             } else if (err) {
//                 res.send(err);
//             } else {
//                 // store image in database
//                 var imageName = req.file.originalname;
//                 var inputValues = {
//                     image_name: imageName,
//                 };
//                 // call model
//                 imageModel.storeImage(inputValues, function (data) {
//                     res.render("upload-form", { alertMsg: data });
//                 });
//             }
//         });
//     },
// };

// exports.getCategorySales = (req, res) => {
//     ProductModel.getProductCodeQuan((err, categoryAnalytics) => {
//         if (err) throw err;
//         res.render("analytics", {
//             title: "Analytic",
//             categoryAnalytic: categoryAnalytics,
//             //JSON.stringify()
//         });
//     });
// };

// const { render } = require('ejs');
// const express = require('express');
// const mongoose = require('mongoose');
// var router = express.Router();
// const products = require('../models/product.model');
//const products = mongoose.model('products');

// router.get('/product', (req, res) => {
//     products.find({}, function(err, movies) {
//             res.render('/views/product', {
//                 product: movies
//             });
//     });
// });

// retrieve and return all users/ retrive and return a single user
//exports.find = (req, res)=>{
// if(req.query.id){
//     const id = req.query.id;
//     products.findById(id)
//         .then(data =>{
//             if(!data){
//                 res.status(404).send({ message : "Not found user with id "+ id})
//             }else{
//                 res.send(data)
//             }
//         })
//         .catch(err =>{
//             res.status(500).send({ message: "Erro retrieving user with id " + id})
//         })

// }else{
// products.find()
//     .then(product => {
//         res.send(product)
//     })
//     .catch(err => {
//         res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
//     })
//}

//}

// router.get('/product', (req, res) => {
//     products.find((err, rows) =>{
//         if(!err){
//             res.render("/views/product",{
//                 products : product
//             });
//         }
//         else{
//             console.log('Error in read data' + err);
//         }
//     })
// });

//module.exports = router;
