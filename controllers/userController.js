const UserModel = require("../models/user.model");
const cartModel = require("../models/cart.model");
const { checkLogin } = require("../middleware/auth");

exports.checkUserLogin = async (req, res, next) => {
    const userReq = new UserModel(req.body);
    UserModel.checkUser(userReq, (err, result) => {
        if (err) throw err;
        //true
        var accessToken = result[0].accessToken;
        console.log("Result in controller is " + accessToken);
        console.log("========adding cookie");
        res.cookie("token", accessToken, { secure: process.env.NODE_ENV === "production" });
        console.log("========finish cookie");
        cartModel.loadCartStaff(userReq.Id, (err, cart) => {
            if (err) throw err;
            console.log(cart);
            if (cart.length == 0) {
                cartModel.insertCartStaff(userReq.Id, (err, result) => {
                    if (err) throw err;
                    cartModel.loadCartStaff(userReq.Id, (err, result) => {
                        res.locals.cart = result[0];
                        next();
                        // cartItemModel.loadUserCartItem(result[0].cartID, (err, ItemResult) => {
                        //     if (err) throw err;
                        //     if (ItemResult.length == 0) {
                        //         res.locals.cartItem = {
                        //             cartID: null,
                        //             productCode: null,
                        //             productName: null,
                        //             price: null,
                        //             quantity: null,
                        //             size: null,
                        //             productImg: null,
                        //         };
                        //         next();
                        //     } else {
                        //         res.locals.cartItem = ItemResult;
                        //         next();
                        //     }
                        // });
                    });
                });
            } else {
                res.locals.cart = cart[0];
                next();
                // cartItemModel.loadUserCartItem(cart[0].cartID, (err, ItemResult) => {
                //     if (err) throw err;
                //     if (ItemResult.length == 0) {
                //         res.locals.cartItem = {
                //             cartID: null,
                //             productCode: null,
                //             productName: null,
                //             price: null,
                //             quantity: null,
                //             size: null,
                //             productImg: null,
                //         };
                //         next();
                //         // cartItemModel.insertCartItem(cart[0].cartID, (err, itemResult) => {
                //         //     if (err) throw err;
                //         //     cartItemModel.loadUserCartItem(cart[0].cartID, (err, cartItem) => {
                //         //         res.locals.cartItem = cartItem;
                //         //         next();
                //         //     });
                //         // });
                //     } else {
                //         res.locals.cartItem = ItemResult;
                //         next();
                //     }
                // });
            }
        });
        //res.header("auth-token", accessToken);
        //.send({ token: accessToken });
        //res.redirect("/");

        //res.send({ token: accessToken });
        //var verified;
        // res.render(""),
        //     {
        //         token: accessToken,
        //     };
        // checkLogin(req, (err, verified) => {
        //     if (err) throw err;
        //     res.render("index", {
        //         token: accessToken,
        //         Id: verified.Id,
        //         role: verified.role,
        //     });
        // });
    });
};
