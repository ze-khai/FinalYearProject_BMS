var connection = require("../connection/db");
const orderDetailModel = require("../models/orderDetail.model");
const fileUpload = require("express-fileupload");
var async = require("async");

var Product = function (product) {
    this.productCode = product.productCode;
    this.productName = product.productName;
    this.category = product.category;
    this.productType = product.productType;
    this.productDescription = product.productDescription;
    this.quantityInStock = product.quantityInStock;
    this.price = product.price;
    this.quantity0 = product.quantity0;
    this.quantity1 = product.quantity1;
    this.quantity2 = product.quantity2;
    this.quantity3 = product.quantity3;
    this.quantity4 = product.quantity4;
    this.quantity = product.quantity;
    this.sizes = product.sizes;
};

// var Image = function (product) {
//     this.productImg = product.productImg;
// };

Product.getAllProduct = (result) => {
    let sql = "select * FROM products";
    let query = connection().query(sql, (err, res) => {
        if (err) throw err;
        //connection.release();

        result(null, res);
    });
};

Product.goUpdateProduct = (productCode, result) => {
    //productCode = req.params.productCode;
    let sql = `SELECT * FROM products WHERE productCode = ?`;
    let query = connection().query(sql, productCode, (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

// Product.updateImage = (productCode, productImg, result) => {
//     let sql = `UPDATE products SET productImg = ? WHERE productCode = ?`;
//     let query = connection().query(sql, productImg, productCode, (err, res) => {
//         if (err) throw err;
//         result(null, res);
//     });
// };
var pdcode;
Product.updateProduct = (productReq, result) => {
    let sql = `UPDATE products SET productName = ?, category = ?, productType = ?, productDescription = ?, price = ? WHERE productCode = ?`;
    let sql1 = `UPDATE products_size SET quantity = ? WHERE productCode = ? AND size = ?`;
    let sql2 = `UPDATE products SET quantityInStock = ? WHERE productCode = ?`;
    let sql3 = `UPDATE products SET productName = ?, category = ?, productType = ?, productDescription = ?, quantityInStock = ?, price = ? WHERE productCode = ?`;
    var pcode = productReq.productCode;
    var pname = productReq.productName;
    var category = productReq.category;
    var ptype = productReq.productType;
    var pdesc = productReq.productDescription;
    var quantityInStock = productReq.quantityInStock;
    //console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!" + quantityInStock);
    var price = productReq.price;
    var quantity = [
        productReq.quantity0,
        productReq.quantity1,
        productReq.quantity2,
        productReq.quantity3,
        productReq.quantity4,
    ];
    var StringSizes = productReq.sizes;
    pdcode = pcode;
    if (quantityInStock) {
        let query3 = connection().query(
            sql3,
            [pname, category, ptype, pdesc, quantityInStock, price, pcode],
            (err, res) => {
                if (err) throw err;
                result(null, pcode);
            }
        );
    } else {
        var sizes = StringSizes.split(",");
        console.log(sizes);
        console.log(quantity);

        for (var i = 0; i < sizes.length; i++) {
            let query1 = connection().query(sql1, [parseInt(quantity[i]), pcode, sizes[i]], (err, res) => {
                if (err) throw err;
            });
        }

        let stockUpdate = 0;
        for (var i = 0; i < quantity.length; i++) {
            if (quantity[i]) {
                stockUpdate += parseInt(quantity[i]);
            }
        }

        let query2 = connection().query(sql2, [stockUpdate, pcode], (err, res) => {
            if (err) throw err;
        });

        let query = connection().query(sql, [pname, category, ptype, pdesc, price, pcode], (err, res) => {
            if (err) throw err;
            result(null, pcode);
        });
    }
};

Product.productAdd = (productReq, result) => {
    let sql = `INSERT INTO products (productCode, productName, category, productType, productDescription, quantityInStock, price) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    let sql1 = `INSERT INTO products_size(size, quantity, productCode) VALUES (?, ?, ?)`;

    var pcode = productReq.productCode;
    var pname = productReq.productName;
    var category = productReq.category;
    var ptype = productReq.productType;
    var pdesc = productReq.productDescription;
    //var stock = productReq.quantityInStock;
    var price = productReq.price;
    var quantity = [
        productReq.quantity0,
        productReq.quantity1,
        productReq.quantity2,
        productReq.quantity3,
        productReq.quantity4,
    ];
    let stockAdd = 0;
    for (var i = 0; i < quantity.length; i++) {
        if (quantity[i]) {
            stockAdd += parseInt(quantity[i]);
        }
    }
    let query = connection().query(sql, [pcode, pname, category, ptype, pdesc, stockAdd, price], (err, res) => {
        if (err) throw err;
        result(null, res);
    });

    for (var i = 0; i < quantity.length; i++) {
        if (quantity[i]) {
            console.log(quantity[i]);
            var size = null;
            if (quantity.indexOf(quantity[i]) == 0) {
                size = "XS";
            }
            if (quantity.indexOf(quantity[i]) == 1) {
                size = "S";
            }
            if (quantity.indexOf(quantity[i]) == 2) {
                size = "M";
            }
            if (quantity.indexOf(quantity[i]) == 3) {
                size = "L";
            }
            if (quantity.indexOf(quantity[i]) == 4) {
                size = "XL";
            }
            let query1 = connection().query(sql1, [size, parseInt(quantity[i]), pcode], (err, res) => {
                if (err) throw err;
            });
        }
    }

    //console.log(pcode);
};

Product.productDelete = (productCode, result) => {
    let sql = `DELETE FROM products where productCode = ?`;
    let query = connection().query(sql, productCode, (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

Product.getProductTypeAnalytic = (result) => {
    var NumTops = 0;
    var NumBot = 0;
    var NumOut = 0;
    var NumAcc = 0;
    var obj = {};
    orderDetailModel.getAllProductCode(async (err, orderDetails) => {
        if (err) throw err;
        let c = 0;
        async.forEach(orderDetails, function (orderDetail, key, callback) {
            //console.log(orderDetails.length);
            //console.log(orderDetail);
            //console.log(orderDetails[0]);
            let sql = `SELECT productType from products WHERE productCode = ?`;
            let query = connection().query(sql, orderDetail.productCode, (err, res) => {
                if (err) throw err;
                if (res[0].productType == "Tops") {
                    NumTops = NumTops + orderDetail.quantity;
                }
                if (res[0].productType == "Bottoms") {
                    NumBot = NumBot + orderDetail.quantity;
                }
                if (res[0].productType == "Outwear") {
                    NumOut = NumOut + orderDetail.quantity;
                }
                if (res[0].productType == "Accessories") {
                    NumAcc = NumAcc + orderDetail.quantity;
                }
                //console.log(c);
                if (orderDetails.length == c + 1) {
                    obj = [
                        { productType: "Tops", number: NumTops },
                        { productType: "Bottoms", number: NumBot },
                        { productType: "Outwear", number: NumOut },
                        { productType: "Accessories", number: NumAcc },
                    ];
                    result(null, obj);
                }
                c++;
            });
        });
    });
};

Product.getProductCodeQuan = (result) => {
    var NumMen = 0;
    var NumWomen = 0;
    var NumKids = 0;
    var obj = {};
    orderDetailModel.getAllProductCode(async (err, orderDetails) => {
        if (err) throw err;
        let i = 0;
        async.forEach(orderDetails, function (orderDetail, key, callback) {
            //console.log(orderDetails.length);
            console.log(orderDetail);
            //console.log(orderDetails[0]);
            let sql = `SELECT category from products WHERE productCode = ?`;
            let query = connection().query(sql, orderDetail.productCode, (err, res) => {
                if (err) throw err;
                if (res[0].category == "Men") {
                    NumMen = NumMen + orderDetail.quantity;
                }
                if (res[0].category == "Women") {
                    NumWomen = NumWomen + orderDetail.quantity;
                }
                if (res[0].category == "Kids") {
                    NumKids = NumKids + orderDetail.quantity;
                }
                console.log(i);
                if (orderDetails.length == i + 1) {
                    obj = [
                        { category: "Men", number: NumMen },
                        { category: "Women", number: NumWomen },
                        { category: "Kids", number: NumKids },
                    ];
                    result(null, obj);
                    //connection.end();
                }
                i++;
            });
        });
    });
};

Product.updateImage = async (req, result) => {
    if (req.files.productImg) {
        // console.log("PCODE = " + pdcode);
        var file = req.files.productImg;
        //console.log(file);
        var productImg = file.name;
        //console.log(productImg);
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        productImg = productImg.replace(/\s+/g, "-");
        const path = "./public/img/product-img/" + uniqueSuffix + "-" + productImg;
        var newProductImg = uniqueSuffix + "-" + productImg;
        let sql = "UPDATE products SET productImg = ? WHERE productCode = ?";
        let query = connection().query(sql, [newProductImg, pdcode], (err, res) => {
            if (err) throw err;

            file.mv(path, (err) => {
                if (err) throw err;
                console.log("Success Upload");
            });
            result(null, res);
        });
    }
};

Product.searchProduct = (req, result) => {
    var productName = req.query.searchProduct;
    let sql = 'SELECT * from products where productName like "%' + productName + '%"';
    let query = connection().query(sql, (err, res) => {
        if (err) throw err;
        // var data = [];
        // for (i = 0; i < res.length; i++) {
        //     data.push(res[i].productName);
        // }
        result(null, res);
    });
};

module.exports = Product;
//module.exports = Image;
