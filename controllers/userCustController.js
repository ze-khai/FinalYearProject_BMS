const userCustModel = require("../models/userCust.model");

exports.loadCustUser = (req, res, next) => {
    let fbToken = req.cookies.fbsr_972203906866619;
    if (fbToken) {
        userCustModel.loadCustUser(req, (err, userCust) => {
            if (err) throw err;
            if (userCust.length == 0) {
                userCustModel.insertCustUser(req, (err, result) => {
                    if (err) throw err;
                    userCustModel.loadCustUser(req, (err, result) => {
                        res.cookie("userCust", result[0]);
                        res.locals.userCust = result;
                        next();
                    });
                });
            } else {
                res.cookie("userCust", userCust[0]);
                console.log("ADDING COOKIE=========");
                console.log(userCust[0]);
                res.locals.userCust = userCust;
                next();
            }
        });
    }
};

exports.CustUserDetail = (req, res, next) => {
    let fbToken = req.cookies.fbsr_972203906866619;
    if (fbToken) {
        let userCustToken = req.cookies.userCust;
        console.log("THIS IS COOKIE ====================");
        console.log(userCustToken);
        var userID = userCustToken.userID;
        var name = userCustToken.name;
        var email = userCustToken.email;
        var gender = userCustToken.gender;
        var pic = userCustToken.pic;
        console.log("USERID IS: " + userID);

        res.locals.userCust = { userID: userID, name: name, email: email, gender: gender, pic: pic };
        next();
    } else {
        res.locals.userCust = { userID: null, name: null, email: null, gender: null, pic: null };
        next();
    }
};
