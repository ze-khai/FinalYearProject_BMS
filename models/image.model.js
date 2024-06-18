var connection = require("../connection/db");

var Image = function (product) {
    this.productImg = product.productImg;
};



Image.updateImage = (productCode, productImg, result) => {
    let sql = `UPDATE products SET productImg = ? WHERE productCode = ?`;
    var file = productFile.productImg;
    var img_name = file.name;
    if (file.mimetype == "image/jpg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {
        file.mv("../public/img/product-img/" + file.name, (err) => {
            if (err) throw err;
            let query = connection().query(sql, img_name, productCode, (err, res) => {
                if (err) throw err;
                result(null, res);
            });
        });
    }
};

module.exports = Image;
