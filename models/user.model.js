var connection = require("../connection/db");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

var User = function (user) {
    this.Id = user.Id;
    this.password = user.password;
    this.empID = user.empID;
    this.role = user.role;
};

User.checkUser = async (userReq, result) => {
    // try {
    var Id = userReq.Id;
    var password = userReq.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Hashed Pass = " + hashedPassword);
    let sql = "SELECT * FROM users WHERE Id = ?";
    let query = await connection().query(sql, Id, async (err, res1) => {
        if (err) throw err;
        if (res1.length == 0) {
            console.log("User Id incorrect");
            result(null, false);
        } else {
            console.log(res1);
            let sql1 = "Select password from users where Id = ?";
            let query1 = await connection().query(sql1, [Id], (err, res) => {
                if (err) throw err;
                const verified = bcrypt.compareSync(password, res[0].password);
                let checkResult;
                var token;
                if (verified) {
                    //console.log(verified);
                    token = jwt.sign(
                        {
                            Id: res1[0].Id,
                            role: res1[0].role,
                        },
                        process.env.ACCESS_TOKEN_SECRET
                    );

                    console.log("Success");
                } else {
                    console.log("Password Invalid");
                }
                checkResult = [
                    {
                        Exist: verified,
                        accessToken: token,
                    },
                ];
                console.log(checkResult);
                result(null, checkResult);
            });
        }
    });
};

module.exports = User;
