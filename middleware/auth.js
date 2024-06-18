const jwt = require("jsonwebtoken");
const cartModel = require("../models/cart.model");
const cartItemModel = require("../models/cartItem.model");

var connection = require("../connection/db");
const cart = require("../models/cart.model");

exports.checkLogin = (req, res, next) => {
    let token = req.cookies.token;
    let fbToken = req.cookies.fbsr_972203906866619;
    let userCustToken = req.cookies.userCust;
    console.log("Token is " + token);
    console.log("Fb Token is " + fbToken);
    if (!token && !fbToken) {
        res.render("login", { title: "Log In Page", user: null });
    } else {
        //return res.status(401).send("Access Denied");
        // try {
        if (token) {
            if (token.startsWith("Bearer ")) {
                token = token.slice(7, token.length).trimleft();
            }
            const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            console.log(verified);
            res.locals.user = verified;
            cartModel.loadCartStaff(verified.Id, (err, cart) => {
                if (err) throw err;
                console.log(cart);
                if (cart.length == 0) {
                    cartModel.insertCartStaff(verified.Id, (err, result) => {
                        if (err) throw err;
                        cartModel.loadCartStaff(verified.Id, (err, result) => {
                            res.locals.cart = result[0];
                            // next();
                            cartItemModel.loadUserCartItem(result[0].cartID, (err, ItemResult) => {
                                if (err) throw err;
                                if (ItemResult.length == 0) {
                                    res.locals.cartItem = {
                                        cartID: null,
                                        productCode: null,
                                        productName: null,
                                        price: null,
                                        quantity: null,
                                        size: null,
                                        productImg: null,
                                    };
                                    next();
                                } else {
                                    res.locals.cartItem = ItemResult;
                                    next();
                                }
                            });
                        });
                    });
                } else {
                    console.log("ADA CART " + cart[0].cartID);
                    res.locals.cart = cart[0];
                    cartItemModel.loadUserCartItem(cart[0].cartID, (err, ItemResult) => {
                        if (err) throw err;
                        if (ItemResult.length == 0) {
                            res.locals.cartItem = {
                                cartID: null,
                                productCode: null,
                                productName: null,
                                price: null,
                                quantity: null,
                                size: null,
                                productImg: null,
                            };
                            next();
                            // cartItemModel.insertCartItem(cart[0].cartID, (err, itemResult) => {
                            //     if (err) throw err;
                            //     cartItemModel.loadUserCartItem(cart[0].cartID, (err, cartItem) => {
                            //         res.locals.cartItem = cartItem;
                            //         next();
                            //     });
                            // });
                        } else {
                            res.locals.cartItem = ItemResult;
                            next();
                        }
                    });
                }
            });
            //res.locals.role = verified.role;
        } else if (fbToken) {
            res.locals.user = { Id: null, role: null };
            var FBId = userCustToken.userID;
            cartModel.loadCartFB2(FBId, (err, cart) => {
                if (err) throw err;
                console.log(cart);
                if (cart.length == 0) {
                    cartModel.insertCartFB2(FBId, (err, result) => {
                        if (err) throw err;
                        cartModel.loadCartFB2(FBId, (err, result) => {
                            res.locals.cart = result[0];
                            // next();
                            c;
                            cartItemModel.loadUserCartItem(result[0].cartID, (err, ItemResult) => {
                                if (err) throw err;
                                if (ItemResult.length == 0) {
                                    res.locals.cartItem = {
                                        cartID: null,
                                        productCode: null,
                                        productName: null,
                                        price: null,
                                        quantity: null,
                                        size: null,
                                        productImg: null,
                                    };
                                    next();
                                } else {
                                    res.locals.cartItem = ItemResult;
                                    next();
                                }
                            });
                        });
                    });
                } else {
                    console.log("ADA CART " + cart[0].cartID);
                    res.locals.cart = cart[0];
                    cartItemModel.loadUserCartItem(cart[0].cartID, (err, ItemResult) => {
                        if (err) throw err;
                        if (ItemResult.length == 0) {
                            res.locals.cartItem = {
                                cartID: null,
                                productCode: null,
                                productName: null,
                                price: null,
                                quantity: null,
                                size: null,
                                productImg: null,
                            };
                            next();
                            // cartItemModel.insertCartItem(cart[0].cartID, (err, itemResult) => {
                            //     if (err) throw err;
                            //     cartItemModel.loadUserCartItem(cart[0].cartID, (err, cartItem) => {
                            //         res.locals.cartItem = cartItem;
                            //         next();
                            //     });
                            // });
                        } else {
                            res.locals.cartItem = ItemResult;
                            next();
                        }
                    });
                }
            });
        }
    }
};

exports.logout = (req, res) => {
    res.cookie("token", "", { maxAge: 1 });
    res.redirect("/");
};

exports.goHomePage = (req, res) => {
    res.redirect("/");
    //res.render("index");
};

exports.checkUser = (req, res, next) => {
    let token = req.cookies.token;
    let fbToken = req.cookies.fbsr_972203906866619;

    if (fbToken) {
        res.locals.user = { Id: null, role: null };
        res.redirect("/");
    } else if (token) {
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimleft();
        }
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        res.locals.user = verified;

        //res.locals.role = verified.role;
        next();
    }
};

exports.staffNotAllowed = (req, res, next) => {
    let token = req.cookies.token;
    //let fbToken = req.cookies.fbsr_972203906866619;

    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trimleft();
    }
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (verified.role != "Staff") {
        res.locals.user = verified;
        next();
    } else {
        res.locals.user = verified;
        res.redirect("/product");
    }

    //res.locals.role = verified.role;
};

// exports.staffOnly = (req, res, next) => {
//     let token = req.cookies.token;
//     //let fbToken = req.cookies.fbsr_972203906866619;

//     if (token.startsWith("Bearer ")) {
//         token = token.slice(7, token.length).trimleft();
//     }
//     const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//     if (verified.role != "Staff") {
//         res.locals.user = verified;
//         next();
//     } else {
//         res.locals.user = verified;
//         res.redirect("/product");
//     }
// };

exports.adminOnly = (req, res, next) => {
    let token = req.cookies.token;
    //let fbToken = req.cookies.fbsr_972203906866619;

    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trimleft();
    }
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (verified.role == "Admin") {
        res.locals.user = verified;
        next();
    } else {
        res.locals.user = verified;
        res.redirect("/product");
    }
};

exports.checkLoginStatus = (req, res, next) => {
    let token = req.cookies.token;
    console.log("Token is " + token);
    if (!token) {
        res.render("login", { title: "Log In Page", Id: null, role: null });
    } else {
        next();
    }
};
