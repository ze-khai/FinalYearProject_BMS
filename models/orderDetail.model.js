var connection = require("../connection/db");

var OrderDetail = function (orderDetail) {
    this.orderID = orderDetail.orderID;
    this.productCode = orderDetail.productCode;
    this.quantity = orderDetail.quantity;
    this.productType = orderDetail.productType;
};

OrderDetail.getAllDetail = (result) => {
    let sql = `SELECT * FROM orderdetail`;
    let query = connection().query(sql, (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

OrderDetail.getAnalyticSales = (result) => {
    let sql = `SELECT productType, count(*) as number from orderdetail group by productType`;
    let query = connection().query(sql, (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

OrderDetail.getAllProductCode = (result) => {
    let sql = `select productCode, quantity from orderdetail`;
    let query = connection().query(sql, (err, res) => {
        if (err) throw err;
        result(null, res);
        //connection.end();
    });
};

OrderDetail.searchOrderDetail = (req, result) => {
    var OrderID = req.query.searchOrderDetail;
    let sql = 'SELECT * from orderdetail where orderID like "%' + OrderID + '%"';
    let query = connection().query(sql, (err, res) => {
        if (err) throw err;
        // var data = [];
        // for (i = 0; i < res.length; i++) {
        //     data.push(res[i].productName);
        // }
        result(null, res);
    });
};

module.exports = OrderDetail;
