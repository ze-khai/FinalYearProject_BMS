var connection = require("../connection/db");

var Product_size = function (product_size) {
    this.id = product_size.id;
    this.size = product_size.size;
    this.quantity = product_size.quantity;
    this.productCode = product_size.productCode;
};

Product_size.getAllProductSize = (productCode, result) => {
    let sql = `SELECT * FROM products_size WHERE productCode = ?`;
    let query = connection().query(sql, productCode, (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

module.exports = Product_size;
