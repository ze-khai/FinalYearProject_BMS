const cartModel = require("../models/cart.model");
const cartItemModel = require("../models/cartItem.model");
const jwt = require("jsonwebtoken");

exports.loadCart = (req, res, next) => {
    let fbToken = req.cookies.fbsr_972203906866619;
    let token = req.cookies.token;
    console.log("LOAD CART TOKEN: " + token);
    if (fbToken) {
        cartModel.loadCartFB(req, (err, cart) => {
            if (err) throw err;
            if (cart.length == 0) {
                cartModel.insertCartFB(req, (err, result) => {
                    if (err) throw err;
                    cartModel.loadCartFB(req, (err, result) => {
                        //console.log("ADDING CART COOKIE =============");
                        //res.cookie("cart", result[0]);
                        res.locals.cart = result[0];
                        next();
                        // cartItemModel.loadUserCartItem(result[0].cartID, (err, cartItem) => {
                        //     if (err) throw err;
                        //     res.locals.cartItem = cartItem;
                        //     next();
                        // });
                    });
                });
            } else {
                //console.log("ADDING CART COOKIE =============");
                //res.cookie("cart", cart[0]);
                res.locals.cart = cart[0];
                next();
                // cartItemModel.loadUserCartItem(cart[0].cartID, (err, cartItem) => {
                //     if (err) throw err;
                //     res.locals.cartItem = cartItem;
                //     next();
                // });
            }
        });
    } else if (token) {
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
                console.log("ADA CART " + cart[0].cartID);
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
    }
};

exports.cartDetail = (req, res, next) => {
    let fbToken = req.cookies.fbsr_972203906866619;
    let token = req.cookies.token;
    if (fbToken) {
        let cartToken = req.cookies.cart;
        var cartID = cartToken.cartID;
        var FBId = cartToken.FBId;
        var userId = cartToken.userId;
        console.log("CARTID IN COOKIE is : " + cartToken.cartID);

        cartItemModel.loadUserCartItem(cartID, (err, cartItem) => {
            if (err) throw err;
            res.locals.cartItem = cartItem;
            res.locals.cart = { cartID: cartID, FBId: FBId, userId: userId };
            next();
        });
    } else {
        next();
    }
    //else if (token) {
    //     if (token.startsWith("Bearer ")) {
    //         token = token.slice(7, token.length).trimleft();
    //     }
    //     const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    //     console.log(verified);
    //     res.locals.user = verified;
    //     cartModel.loadCartStaff(verified.Id, (err, cart) => {
    //         if (err) throw err;
    //         console.log(cart);
    //         if (cart.length == 0) {
    //             cartModel.insertCartStaff(verified.Id, (err, result) => {
    //                 if (err) throw err;
    //                 cartModel.loadCartStaff(verified.Id, (err, result) => {
    //                     cartItemModel.loadUserCartItem(result[0].cartID, (err, ItemResult) => {
    //                         if (err) throw err;
    //                         if (ItemResult.length == 0) {
    //                             res.locals.cartItem = {
    //                                 cartID: null,
    //                                 productCode: null,
    //                                 productName: null,
    //                                 price: null,
    //                                 quantity: null,
    //                                 size: null,
    //                                 productImg: null,
    //                             };
    //                             res.locals.cart = result;
    //                             next();
    //                         } else {
    //                             res.locals.cart = cart;
    //                             res.locals.cartItem = ItemResult;
    //                             next();
    //                         }
    //                     });
    //                 });
    //             });
    //         } else {
    //             console.log("ADA CART " + cart[0].cartID);
    //             cartItemModel.loadUserCartItem(cart[0].cartID, (err, ItemResult) => {
    //                 if (err) throw err;
    //                 if (ItemResult.length == 0) {
    //                     res.locals.cartItem = {
    //                         cartID: null,
    //                         productCode: null,
    //                         productName: null,
    //                         price: null,
    //                         quantity: null,
    //                         size: null,
    //                         productImg: null,
    //                     };
    //                     res.locals.cart = cart;
    //                     next();
    //                     // cartItemModel.insertCartItem(cart[0].cartID, (err, itemResult) => {
    //                     //     if (err) throw err;
    //                     //     cartItemModel.loadUserCartItem(cart[0].cartID, (err, cartItem) => {
    //                     //         res.locals.cartItem = cartItem;
    //                     //         next();
    //                     //     });
    //                     // });
    //                 } else {
    //                     res.locals.cart = cart;
    //                     res.locals.cartItem = ItemResult;
    //                     next();
    //                 }
    //             });
    //         }
    //     });
    // }
    //else {
    //     cartItemModel.loadUserCartItem(cartID, (err, cartItem) => {});
    //     res.locals.cartItem = null;
    //     res.locals.cart = { cartID: null, FBId: null, userId: null };
    //     next();
    // }
};

exports.addToCart = (req, res) => {
    cartItemModel.checkItemExistCart(req, (err, result1) => {
        if (err) throw err;
        if (result1.length == 0) {
            cartItemModel.addToCart(req, (err, result) => {
                if (err) throw err;
                res.redirect("/productDetail/" + result);
            });
        } else {
            cartItemModel.updateExistCart(req, (err, result2) => {
                if (err) throw err;
                res.redirect("/productDetail/" + result2);
            });
        }
    });
};

exports.removeCartItem = (req, res) => {
    cartItemModel.removeCartItem(req, (err, result) => {
        if (err) throw err;
        res.redirect("/cart");
    });
};

exports.updateCartItem = (req, res) => {
    cartItemModel.updateCartItem(req, (err, result) => {
        if (err) throw err;
        res.redirect("/cart");
    });
};

exports.clearCartItem = (req, res) => {
    cartItemModel.clearCartItem(req, (err, result) => {
        if (err) throw err;
        res.redirect("/cart");
    });
};

exports.purchasePayment = (req, res) => {
    cartItemModel.purchasePayment(req, (err, result) => {
        if (err) throw err;
        res.json(result);
        //res.redirect("/cart");
    });
};

// exports.loadCartItem = (req, res, next) => {
//     cartItemModel.loadUserCartItem(req, (err, cartItem) => {
//         if (err) throw err;
//         res.locals.cartItem = cartItem;
//         next();
//     });
// };
