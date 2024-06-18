var connection = require("../connection/db");

var Order = function (order) {
    this.orderID = order.orderID;
    this.orderDate = order.orderDate;
    this.totalPrice = order.totalPrice;
    this.status = order.status;
    this.shipAddress = order.shipAddress;
    this.shipCity = order.shipCity;
    this.shipPostalCode = order.shipPostalCode;
    this.shipState = order.shipState;
    this.customerID = order.customerID;
};

Order.getAllOrder = (result) => {
    let sql = "Select * FROM orders";
    let query = connection().query(sql, (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

Order.goUpdateOrd = (orderID, result) => {
    let sql = "SELECT * FROM orders WHERE orderID = ?";
    let query = connection().query(sql, orderID, (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

Order.orderUpdate = (req, result) => {
    let sql =
        "UPDATE orders SET receiverName = ?, receiverPhone = ?, status = ?, shipAddress = ?, shipCity = ?, shipPostalCode = ?, shipState = ? where orderID = ?";
    var orderID = req.body.orderID;
    //var orderDate = ordReq.orderDate;
    //var totalPrice = ordReq.totalPrice;
    var receiverName = req.body.receiverName;
    var receiverPhone = req.body.receiverPhone;
    var status = req.body.status;
    var shipAddress = req.body.shipAddress;
    var shipCity = req.body.shipCity;
    var shipPostalCode = req.body.shipPostalCode;
    var shipState = req.body.shipState;
    console.log("receiverPhone = " + receiverName);
    let query = connection().query(
        sql,
        [receiverName, receiverPhone, status, shipAddress, shipCity, shipPostalCode, shipState, orderID],
        (err, res) => {
            if (err) throw err;
            result(null, res);
        }
    );
};

Order.orderDelete = (orderID, result) => {
    let sql = `DELETE FROM orders where orderID = ?`;
    let query = connection().query(sql, orderID, (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

Order.searchOrderList = (req, result) => {
    var orderID = req.query.searchOrderList;
    let sql = 'SELECT * from orders where orderID like "%' + orderID + '%"';
    let query = connection().query(sql, (err, res) => {
        if (err) throw err;
        // var data = [];
        // for (i = 0; i < res.length; i++) {
        //     data.push(res[i].productName);
        // }
        result(null, res);
    });
};

Order.placeOrder = (req, result) => {
    let sql = `INSERT INTO orders (orderDate, receiverName, receiverPhone, totalPrice, status, shipAddress, shipCity, shipPostalCode, shipState, customerID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
};

Order.getOrderHistory = (req, result) => {
    let sql = `SELECT * FROM  customers WHERE FbId = ?`;
    let sql1 = `SELECT * FROM customers WHERE staffUserID = ?`;
    let sql2 = `SELECT * FROM orders WHERE customerID = ?`;
    let sql3 = `SELECT * FROM orderdetail WHERE orderID = ?`;
    let sql4 = `SELECT * FROM products WHERE productCode = ?`;
    var userID = req.params.userID;
    let data = [];
    let orderDetails = [];
    let productDetail = [];

    let query = connection().query(sql, userID, (err, res) => {
        if (err) throw err;
        if (res.length == 0) {
            let query1 = connection().query(sql1, userID, (err, res1) => {
                if (err) throw err;
                if (res1.length == 0) {
                    data = { order: null, orderDetail: null, productDetail: null };
                    result(null, data);
                } else {
                    let query2 = connection().query(sql2, res1[0].customerID, (err, res2) => {
                        if (err) throw err;
                        let x = 0;
                        let order = res2;
                        if (res2.length == 0) {
                            data = {
                                order: null,
                                orderDetail: null,
                                productDetail: null,
                            };
                            result(null, data);
                        } else {
                            for (var i = 0; i < res2.length; i++) {
                                let query3 = connection().query(sql3, res2[i].orderID, (err, res3) => {
                                    if (err) throw err;
                                    //console.log(res3);
                                    console.log(res3);
                                    orderDetails = orderDetails.concat(res3);
                                    let c = 0;
                                    for (var a = 0; a < res3.length; a++) {
                                        let query4 = connection().query(sql4, res3[a].productCode, (err, res4) => {
                                            if (err) throw err;
                                            console.log(res4);
                                            productDetail = productDetail.concat(res4);
                                            console.log(c);
                                            if (res3.length == c + 1) {
                                                data = {
                                                    order: order,
                                                    orderDetail: orderDetails,
                                                    productDetail: productDetail,
                                                };
                                                console.log(data);
                                                result(null, data);
                                            }
                                            c++;
                                        });
                                    }
                                    x++;
                                });
                            }
                        }
                    });
                }
            });
        } else {
            let query2 = connection().query(sql2, res[0].customerID, async (err, res2) => {
                if (err) throw err;
                let x = 0;
                let order = res2;
                console.log(order);
                // res2.forEach((res2) => {
                //     let query3 = connection().query(sql3, res2.orderID, (err, res3) => {
                //         if (err) throw err;
                //         //console.log(res3);
                //         console.log(res3);
                //         orderDetails = orderDetails.concat(res3);
                //         res3.forEach((res3) => {
                //             let query4 = connection().query(sql4, res3.productCode, (err, res4) => {
                //                 if (err) throw err;
                //                 console.log(res4);
                //                 productDetail = productDetail.concat(res4);
                //                 console.log(c);
                //                 if (order.length == c + 1) {
                //                     data = {
                //                         order: order,
                //                         orderDetail: orderDetails,
                //                         productDetail: productDetail,
                //                     };
                //                     console.log(data);
                //                     result(null, data);
                //                 }
                //             });
                //         });

                //         //orderDetail.push(res3);
                //         //orderDetail += res3;
                //         // if (order.length == c + 1) {
                //         //     let x = 0;
                //         //     orderDetails.forEach((orderDetail) => {
                //         //         let query4 = connection().query(sql4, orderDetail.productCode, async (err, res4) => {
                //         //             if (err) throw err;
                //         //             productDetail = productDetail.concat(res4);
                //         //             if (orderDetails.length == x + 1) {
                //         //                 data = {
                //         //                     order: order,
                //         //                     orderDetail: orderDetails,
                //         //                     productDetail: productDetail,
                //         //                 };
                //         //                 console.log(data);
                //         //                 result(null, data);
                //         //             }
                //         //             x++;
                //         //         });
                //         //     });
                //         // }
                //         c++;
                //     });
                // });
                if (res2.length == 0) {
                    data = {
                        order: null,
                        orderDetail: null,
                        productDetail: null,
                    };
                    result(null, data);
                } else {
                    for (var i = 0; i < res2.length; i++) {
                        let query3 = await connection().query(sql3, res2[i].orderID, async (err, res3) => {
                            if (err) throw err;
                            //console.log(res3);

                            console.log(res3);
                            orderDetails = orderDetails.concat(res3);
                            console.log("value of X =" + x);

                            let c = 0;
                            for (var a = 0; a < res3.length; a++) {
                                let query4 = await connection().query(sql4, res3[a].productCode, async (err, res4) => {
                                    if (err) throw err;
                                    console.log("res3 length = " + res3.length);
                                    console.log("res2 length = " + res2.length);
                                    console.log("value of C =" + c);
                                    console.log("value of X2 =" + x);
                                    productDetail = productDetail.concat(res4);
                                    //X IS 2 HERE ???
                                    if (res3.length == c + 1) {
                                        data = {
                                            order: order,
                                            orderDetail: orderDetails,
                                            productDetail: productDetail,
                                        };
                                        console.log("Result data" + data);
                                        console.log("RESULT HERE");
                                        console.log("C = " + c);
                                        result(null, data);
                                    }
                                    c++;
                                });
                            }
                            x++;
                        });
                    }
                }
            });
        }
    });
};

module.exports = Order;
