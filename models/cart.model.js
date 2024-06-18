var connection = require("../connection/db");

var cart = function (cart) {
    this.cartID = cart.cartID;
    this.FBId = cart.FBId;
    this.userId = cart.userId;
};

cart.loadCartFB = (req, result, next) => {
    var fbId = req.body.fbId;
    console.log("LOADCARTITEM: " + fbId);
    let sql = "SELECT * FROM cart WHERE FBId = ?";
    let query = connection().query(sql, fbId, (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

cart.loadCartFB2 = (req, result, next) => {
    var fbId = req;
    console.log("LOADCARTITEM: " + fbId);
    let sql = "SELECT * FROM cart WHERE FBId = ?";
    let query = connection().query(sql, fbId, (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

cart.insertCartFB = (req, result) => {
    var fbId = req.body.fbId;
    console.log("InserCARTITEM: " + fbId);
    let sql = "INSERT INTO cart (FBId) VALUES (?)";
    let sql2 = "INSERT INTO cart (userId) VALUES (?)";
    let query = connection().query(sql, fbId, (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

cart.insertCartFB2 = (req, result) => {
    var fbId = req;
    console.log("InserCARTITEM: " + fbId);
    let sql = "INSERT INTO cart (FBId) VALUES (?)";
    let sql2 = "INSERT INTO cart (userId) VALUES (?)";
    let query = connection().query(sql, fbId, (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

cart.loadCartStaff = (req, result) => {
    var userId = req;
    console.log("SelectCARTITEM: " + userId);
    let sql = "SELECT * FROM cart WHERE userId = ?";
    let query = connection().query(sql, userId, (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

cart.insertCartStaff = (req, result) => {
    var userId = req;
    console.log("InserCARTITEM: " + userId);
    let sql = "INSERT INTO cart (userId) VALUES (?)";
    let query = connection().query(sql, userId, (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

module.exports = cart;
