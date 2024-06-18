var connection = require("../connection/db");

var userCust = function (userCust) {
    this.userID = userCust.cartID;
    this.name = userCust.name;
    this.email = userCust.email;
    this.pic = userCust.pic;
};

userCust.loadCustUser = (req, result) => {
    var fbId = req.body.fbId;
    let sql = "SELECT * FROM user_cust WHERE userID = ?";
    let query = connection().query(sql, fbId, (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

userCust.insertCustUser = (req, result) => {
    var fbId = req.body.fbId;
    var name = req.body.name;
    var email = req.body.email;
    var picture = req.body.picture;
    console.log("FBNAME: " + name);
    let sql = "INSERT INTO user_cust (userID, name, email, pic) VALUES (?, ?, ?, ?)";
    let query = connection().query(sql, [fbId, name, email, picture], (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

module.exports = userCust;
