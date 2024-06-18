var connection = require("../connection/db");

require("dotenv").config();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

const stripe = require("stripe")(stripeSecretKey);

var cartItem = function (cartItem) {
    this.cartID = cartItem.cartID;
    this.productCode = cartItem.productCode;
    this.productName = cartItem.productName;
    this.price = cartItem.price;
    this.quantity = cartItem.quantity;
    this.size = cartItem.size;
    this.productImg = cartItem.productImg;
};

cartItem.loadUserCartItem = (req, result) => {
    var cartID = req;
    //productCode = req.params.productCode;
    let sql = `SELECT * FROM cart_item WHERE cartID = ?`;
    let query = connection().query(sql, cartID, (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

cartItem.insertCartItem = (req, result) => {
    var cartID = req;
    let sql = `INSERT INTO cart_item (cartID) VALUES (?)`;
    let query = connection().query(sql, cartID, (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

cartItem.checkItemExistCart = (req, result) => {
    let sql = `SELECT * FROM cart_item WHERE cartID = ? AND cartProductCode = ? AND size = ?`;
    var cartID = req.body.cartID;
    var productCode = req.body.productCode;
    var size = req.body.size;
    var cartProductCode = productCode + "_" + size;
    let query = connection().query(sql, [cartID, cartProductCode, size], (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

cartItem.updateExistCart = (req, result) => {
    let sql = `UPDATE cart_item SET quantity = ? WHERE cartID = ?  AND cartProductCode = ? AND size = ?`;
    let sql1 = `SELECT quantity FROM cart_item where cartID = ?  AND cartProductCode = ? AND size = ?`;
    var cartID = req.body.cartID;
    var productCode = req.body.productCode;
    var size = req.body.size;
    var cartProductCode = productCode + "_" + size;
    var quantity = req.body.quantity;
    //console.log(typeof quantity);
    let query1 = connection().query(sql1, [cartID, cartProductCode, size], (err, existQuantity) => {
        if (err) throw err;
        //console.log(existQuantity);
        var newQuantity = parseInt(quantity) + parseInt(existQuantity[0].quantity);
        let query = connection().query(sql, [newQuantity, cartID, cartProductCode, size], (err, res) => {
            if (err) throw err;
            result(null, productCode);
        });
    });
};

cartItem.addToCart = (req, result) => {
    let sql = `INSERT INTO cart_item (cartID, cartProductCode, productCode, productName, price, quantity, size, productType, productImg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    var cartID = req.body.cartID;
    var productCode = req.body.productCode;
    var productName = req.body.productName;
    var price = req.body.price;
    var quantity = req.body.quantity;
    var size = req.body.size;
    var productType = req.body.productType;
    var cartProductCode = productCode + "_" + size;
    var productImg = req.body.productImg;
    let query = connection().query(
        sql,
        [cartID, cartProductCode, productCode, productName, price, quantity, size, productType, productImg],
        (err, res) => {
            if (err) throw err;
            result(null, productCode);
        }
    );
};

cartItem.getAllCartItem = (req, result) => {
    let sql = `SELECT * FROM cart_item`;
    let query = connection().query(sql, (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

cartItem.removeCartItem = (req, result) => {
    let sql = `DELETE FROM cart_item where cartID = ? AND cartProductCode = ?`;
    var cartID = req.params.cartID;
    var cartProductCode = req.params.cartProductCode;
    //var size = req.body.size;
    //var cartProductCode = productCode + "-" + size;
    let query = connection().query(sql, [cartID, cartProductCode], (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

cartItem.updateCartItem = (req, result) => {
    let sql = `UPDATE cart_item SET quantity = ? WHERE cartID = ? AND cartProductCode = ?`;
    //let sql1 = `SELECT * FROM cart_item WHERE cartID = ?`;
    var cartID = req.params.cartID;
    var cartProductCode = req.params.cartProductCode;
    //var x = req.body.quantityS11_1234_M;
    //console.log(x);
    var q = "quantity";
    //for(var i = 0; i <)
    // let query1 = connection().query(sql1, cartID, (err, res) => {
    //     if (err) throw err;
    //     for (var i = 0; i < res.length; i++) {
    //         let quantity = res[i].quantity;
    //     }
    // });
    var quantity = req.body[q + cartProductCode];
    console.log("Quantity " + quantity);
    let query = connection().query(sql, [quantity, cartID, cartProductCode], (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

cartItem.clearCartItem = (req, result) => {
    let sql = `DELETE FROM cart_item where CartID = ?`;
    var cartID = req.params.cartID;
    let query = connection().query(sql, cartID, (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

cartItem.purchasePayment = (req, result, next) => {
    let sql = `SELECT * FROM cart_item WHERE cartID = ?`;
    let sql1 = `SELECT * FROM customers WHERE staffUserID = ?`;
    let sql2 = `SELECT * FROM customers WHERE FbId = ?`;
    let sql3 = `INSERT INTO customers (staffUserID) VALUES (?)`;
    let sql4 = `INSERT INTO customers (FbId) VALUES (?)`;
    let sql5 = `INSERT INTO orders (orderDate, receiverName, receiverPhone, totalPrice, customerID, status, shipAddress, shipCity, shipPostalCode, shipState) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    let sql6 = `SELECT orderID FROM orders where orderDate = ? AND receiverName = ? AND receiverPhone = ? AND totalPrice = ? AND customerID = ? AND status = ? AND shipAddress = ? AND shipCity = ? AND shipPostalCode = ? AND shipState = ?`;
    let sql7 = `INSERT INTO orderdetail (orderID, orderProductCode, productCode, size, quantity, productType) VALUES (?, ?, ?, ?, ?, ?)`;
    let sql8 = `DELETE FROM cart_item WHERE cartID = ?`;
    var cartID = req.body.cartID;
    var stripeTokenId = req.body.stripeTokenId;
    var staffUserID = req.body.staffUserID;
    var custUserID = req.body.custUserID;
    console.log(typeof staffUserID);
    console.log("================" + custUserID);
    var custName = req.body.custName;
    var custEmail = req.body.custEmail;

    var today = new Date();
    var orderDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    var receiverName = req.body.receiverName;
    var shipAddress1 = req.body.shipAddress;
    var shipAddress2 = req.body.shipAddress2;
    var shipAddress = shipAddress1 + " " + shipAddress2;
    var status = "In Process";
    var PostalCode = req.body.shipPostalCode;
    var shipPostalCode = parseInt(PostalCode);
    var shipCity = req.body.shipCity;
    var shipState = req.body.shipState;
    var receiverPhone = req.body.receiverPhone;
    console.log(stripeTokenId);

    let query = connection().query(sql, cartID, (err, res) => {
        if (err) throw err;
        var total = 0;
        res.forEach((cartItem) => {
            total += cartItem.price * cartItem.quantity;
        });
        total = parseFloat(total).toFixed(2) * 100;
        //total = parseFloat(total).toFixed(2);
        console.log(total);

        stripe.charges
            .create({
                amount: total,
                source: stripeTokenId,
                currency: "myr",
            })
            .then(function () {
                total = total / 100;
                if (staffUserID !== "") {
                    let query1 = connection().query(sql1, staffUserID, (err, res1) => {
                        if (err) throw err;
                        if (res1.length === 0) {
                            let query2 = connection().query(sql3, staffUserID, (err, res2) => {
                                if (err) throw err;
                                let query3 = connection().query(sql1, staffUserID, (err, res3) => {
                                    if (err) throw err;
                                    var customerID = res3[0].customerID;
                                    console.log("1" + customerID);
                                    let query7 = connection().query(
                                        sql5,
                                        [
                                            orderDate,
                                            receiverName,
                                            receiverPhone,
                                            total,
                                            customerID,
                                            status,
                                            shipAddress,
                                            shipCity,
                                            shipPostalCode,
                                            shipState,
                                        ],
                                        (err, res7) => {
                                            if (err) throw err;
                                            let query8 = connection().query(
                                                sql6,
                                                [
                                                    orderDate,
                                                    receiverName,
                                                    receiverPhone,
                                                    total,
                                                    customerID,
                                                    status,
                                                    shipAddress,
                                                    shipCity,
                                                    shipPostalCode,
                                                    shipState,
                                                ],
                                                (err, res8) => {
                                                    if (err) throw err;
                                                    var orderID = res8[0].orderID;
                                                    let count = 0;
                                                    let cartItems = res;
                                                    res.forEach((cartItem) => {
                                                        var productCode = cartItem.productCode;
                                                        var orderProductCode = cartItem.cartProductCode;
                                                        var size = cartItem.size;
                                                        var quantity = cartItem.quantity;
                                                        var productType = cartItem.productType;
                                                        let query9 = connection().query(
                                                            sql7,
                                                            [
                                                                orderID,
                                                                orderProductCode,
                                                                productCode,
                                                                size,
                                                                quantity,
                                                                productType,
                                                            ],
                                                            (err, res9) => {
                                                                if (err) throw err;
                                                                let query10 = connection().query(
                                                                    sql8,
                                                                    cartID,
                                                                    (err, res10) => {
                                                                        if (err) throw err;
                                                                        if (cartItems.length == count + 1) {
                                                                            console.log("Charge Successful");
                                                                            var data = {
                                                                                message: "Successfully purchased items",
                                                                            };
                                                                            result(null, data);
                                                                        }
                                                                        count++;
                                                                        // result.json({
                                                                        //     message: "Successfully purchased items",
                                                                        // });
                                                                    }
                                                                );
                                                            }
                                                        );
                                                    });
                                                }
                                            );
                                        }
                                    );
                                });
                            });
                        } else {
                            var customerID = res1[0].customerID;
                            console.log("2" + customerID);
                            let query7 = connection().query(
                                sql5,
                                [
                                    orderDate,
                                    receiverName,
                                    receiverPhone,
                                    total,
                                    customerID,
                                    status,
                                    shipAddress,
                                    shipCity,
                                    shipPostalCode,
                                    shipState,
                                ],
                                (err, res7) => {
                                    if (err) throw err;
                                    let query8 = connection().query(
                                        sql6,
                                        [
                                            orderDate,
                                            receiverName,
                                            receiverPhone,
                                            total,
                                            customerID,
                                            status,
                                            shipAddress,
                                            shipCity,
                                            shipPostalCode,
                                            shipState,
                                        ],
                                        (err, res8) => {
                                            if (err) throw err;
                                            var orderID = res8[0].orderID;
                                            let count = 0;
                                            let cartItems = res;
                                            res.forEach((cartItem) => {
                                                var productCode = cartItem.productCode;
                                                var orderProductCode = cartItem.cartProductCode;
                                                var size = cartItem.size;
                                                var quantity = cartItem.quantity;
                                                var productType = cartItem.productType;
                                                let query9 = connection().query(
                                                    sql7,
                                                    [
                                                        orderID,
                                                        orderProductCode,
                                                        productCode,
                                                        size,
                                                        quantity,
                                                        productType,
                                                    ],
                                                    (err, res9) => {
                                                        if (err) throw err;
                                                        let query10 = connection().query(sql8, cartID, (err, res10) => {
                                                            if (err) throw err;
                                                            if (cartItems.length == count + 1) {
                                                                console.log("Charge Successful");
                                                                var data = {
                                                                    message: "Successfully purchased items",
                                                                };
                                                                result(null, data);
                                                            }
                                                            count++;
                                                            // result.json({
                                                            //     message: "Successfully purchased items",
                                                            // });
                                                        });
                                                    }
                                                );
                                            });
                                        }
                                    );
                                }
                            );
                        }
                    });
                } else {
                    let query4 = connection().query(sql2, custUserID, (err, res4) => {
                        if (err) throw err;
                        if (res4.length == 0) {
                            let query5 = connection().query(sql4, custUserID, (err, res5) => {
                                if (err) throw err;
                                let query6 = connection().query(sql2, custUserID, (err, res6) => {
                                    if (err) throw err;
                                    var customerID = res6[0].customerID;
                                    console.log("3" + customerID);
                                    let query7 = connection().query(
                                        sql5,
                                        [
                                            orderDate,
                                            receiverName,
                                            receiverPhone,
                                            total,
                                            customerID,
                                            status,
                                            shipAddress,
                                            shipCity,
                                            shipPostalCode,
                                            shipState,
                                        ],
                                        (err, res7) => {
                                            if (err) throw err;
                                            let query8 = connection().query(
                                                sql6,
                                                [
                                                    orderDate,
                                                    receiverName,
                                                    receiverPhone,
                                                    total,
                                                    customerID,
                                                    status,
                                                    shipAddress,
                                                    shipCity,
                                                    shipPostalCode,
                                                    shipState,
                                                ],
                                                (err, res8) => {
                                                    if (err) throw err;
                                                    var orderID = res8[0].orderID;
                                                    let count = 0;
                                                    let cartItems = res;
                                                    res.forEach((cartItem) => {
                                                        var productCode = cartItem.productCode;
                                                        var orderProductCode = cartItem.cartProductCode;
                                                        var size = cartItem.size;
                                                        var quantity = cartItem.quantity;
                                                        var productType = cartItem.productType;
                                                        let query9 = connection().query(
                                                            sql7,
                                                            [
                                                                orderID,
                                                                orderProductCode,
                                                                productCode,
                                                                size,
                                                                quantity,
                                                                productType,
                                                            ],
                                                            (err, res9) => {
                                                                if (err) throw err;
                                                                let query10 = connection().query(
                                                                    sql8,
                                                                    cartID,
                                                                    (err, res10) => {
                                                                        if (err) throw err;
                                                                        if (cartItems.length == count + 1) {
                                                                            console.log("Charge Successful");
                                                                            var data = {
                                                                                message: "Successfully purchased items",
                                                                            };
                                                                            result(null, data);
                                                                        }
                                                                        count++;
                                                                        // result.json({
                                                                        //     message: "Successfully purchased items",
                                                                        // });
                                                                    }
                                                                );
                                                            }
                                                        );
                                                    });
                                                }
                                            );
                                        }
                                    );
                                });
                            });
                        } else {
                            var customerID = res4[0].customerID;
                            console.log("4" + customerID);
                            let query7 = connection().query(
                                sql5,
                                [
                                    orderDate,
                                    receiverName,
                                    receiverPhone,
                                    total,
                                    customerID,
                                    status,
                                    shipAddress,
                                    shipCity,
                                    shipPostalCode,
                                    shipState,
                                ],
                                (err, res7) => {
                                    if (err) throw err;
                                    let query8 = connection().query(
                                        sql6,
                                        [
                                            orderDate,
                                            receiverName,
                                            receiverPhone,
                                            total,
                                            customerID,
                                            status,
                                            shipAddress,
                                            shipCity,
                                            shipPostalCode,
                                            shipState,
                                        ],
                                        (err, res8) => {
                                            if (err) throw err;
                                            var orderID = res8[0].orderID;
                                            let count = 0;
                                            let cartItems = res;
                                            res.forEach((cartItem) => {
                                                var productCode = cartItem.productCode;
                                                var orderProductCode = cartItem.cartProductCode;
                                                var size = cartItem.size;
                                                var quantity = cartItem.quantity;
                                                var productType = cartItem.productType;
                                                let query9 = connection().query(
                                                    sql7,
                                                    [
                                                        orderID,
                                                        orderProductCode,
                                                        productCode,
                                                        size,
                                                        quantity,
                                                        productType,
                                                    ],
                                                    (err, res9) => {
                                                        if (err) throw err;
                                                        let query10 = connection().query(sql8, cartID, (err, res10) => {
                                                            if (err) throw err;
                                                            if (cartItems.length == count + 1) {
                                                                console.log("Charge Successful");
                                                                var data = {
                                                                    message: "Successfully purchased items",
                                                                };
                                                                result(null, data);
                                                            }
                                                            count++;
                                                            // result.json({
                                                            //     message: "Successfully purchased items",
                                                            // });
                                                        });
                                                    }
                                                );
                                            });
                                        }
                                    );
                                }
                            );
                        }
                    });
                }
            })
            .catch(function () {
                console.log("Charge Fail");
            });
        console.log("CONTINUE");
    });
};

module.exports = cartItem;
